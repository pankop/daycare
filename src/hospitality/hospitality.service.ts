import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Hospitality } from '@prisma/client';
import { CreateHospitalityDto } from './dtos/create-hospitality.dto';
import { UpdateHospitalityDto } from './dtos/update-hospitality.dto';

@Injectable()
export class HospitalityService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.hospitality.findMany();
  }

  async findOneById(HostID: string) {
    if (!HostID) {
      throw new NotFoundException('Hospitality ID is required');
    }

    const hospitality = await this.prisma.hospitality.findUnique({
      where: {
        HostID,
      },
    });

    if (!hospitality) {
      throw new NotFoundException('Hospitality not found');
    }
    return hospitality;
  }

  async createHospitality(
    createHospitalityDto: CreateHospitalityDto,
  ): Promise<Hospitality> {
    return this.prisma.hospitality.create({
      data: createHospitalityDto,
    });
  }

  async updateHospitality(
    HostID: string,
    updateHospitalityDto: UpdateHospitalityDto,
  ): Promise<Hospitality> {
    const hospitality = await this.prisma.hospitality.findUnique({
      where: {
        HostID,
      },
    });

    if (!hospitality) {
      throw new NotFoundException('Hospitality not found');
    }

    return this.prisma.hospitality.update({
      where: { HostID },
      data: updateHospitalityDto,
    });
  }

  async removeHospitality(HostID: string): Promise<Hospitality> {
    const hospitality = await this.prisma.hospitality.findUnique({
      where: { HostID },
    });
    if (!hospitality) {
      throw new NotFoundException('Hospitality not found');
    }

    return this.prisma.hospitality.delete({
      where: { HostID },
    });
  }

  async searchHospitalityByName(name: string) {
    return this.prisma.hospitality.findMany({
      where: {
        OR: [
          { H_FName: { contains: name, mode: 'insensitive' } },
          { H_MName: { contains: name, mode: 'insensitive' } },
          { H_LName: { contains: name, mode: 'insensitive' } },
        ],
      },
    });
  }

  async getHospitalitySorted(
    HostID: string,
    sortBy: string,
    order: 'asc' | 'desc' = 'asc',
  ) {
    const validSortFields = ['H_FName', 'H_BDate', 'H_Sex'];
    if (!validSortFields.includes(sortBy)) {
      throw new Error(`invalid sort field: ${sortBy}`);
    }

    return this.prisma.hospitality.findMany({
      where: { HostID: HostID },
      orderBy: { [sortBy]: order },
    });
  }
}
