import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNannyDto } from './dtos/create-nanny.dto';
import { UpdateNannyDto } from './dtos/update-nanny.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Nanny } from '@prisma/client';

@Injectable()
export class NannyService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.nanny.findMany();
  }

  async findoneBy(NanID: string) {
    if (!NanID) {
      throw new Error('Nanny ID is required');
    }

    const Nanny = await this.prisma.nanny.findUnique({
      where: {
        NanID,
      },
    });

    if (!Nanny) {
      throw new Error('Nanny not found');
    }
    return Nanny;
  }

  async createNanny(createNannyDto: CreateNannyDto): Promise<Nanny> {
    return this.prisma.nanny.create({
      data: createNannyDto,
    });
  }

  async updateNanny(
    NanID: string,
    updateNannyDto: UpdateNannyDto,
  ): Promise<Nanny> {
    const nanny = await this.prisma.nanny.findUnique({
      where: { NanID },
    });

    if (!nanny) {
      throw new NotFoundException('Nanny not found');
    }

    return this.prisma.nanny.update({
      where: { NanID },
      data: updateNannyDto,
    });
  }

  async removeNanny(NanID: string): Promise<Nanny> {
    const nanny = await this.prisma.nanny.findUnique({
      where: { NanID },
    });

    if (!nanny) {
      throw new NotFoundException('Nanny not found');
    }

    return this.prisma.nanny.delete({
      where: { NanID },
    });
  }

  async searchNannyByName(name: string): Promise<Nanny[]> {
    return this.prisma.nanny.findMany({
      where: {
        OR: [
          { N_FName: { contains: name, mode: 'insensitive' } },
          { N_MName: { contains: name, mode: 'insensitive' } },
          { N_LName: { contains: name, mode: 'insensitive' } },
        ],
      },
    });
  }

  async getNannySorted(
    NanID: string,
    sortBy: string,
    order: 'asc' | 'desc' = 'asc',
  ) {
    const validSortFields = ['N_FName', 'N_BDate', 'N_Sex'];
    if (!validSortFields.includes(sortBy)) {
      throw new Error(`invalid sort field: ${sortBy}`);
    }

    return this.prisma.nanny.findMany({
      where: { NanID },
      orderBy: { [sortBy]: order },
    });
  }
}
