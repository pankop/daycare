import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChildDto } from './dtos/create-child.dto';
import { Child } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateChildDto } from './dtos/update-child.dto';

@Injectable()
export class ChildService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.child.findMany();
  }

  async findoneById(ChildID: string) {
    if (!ChildID) {
      throw new Error('Child ID is required');
    }

    const child = await this.prisma.child.findUnique({
      where: {
        ChildID,
      },
    });

    if (!child) {
      throw new NotFoundException('Child not found');
    }
    return child;
  }

  async createChild(createChildDto: CreateChildDto): Promise<Child> {
    return this.prisma.child.create({
      data: createChildDto,
    });
  }

  async updateChild(ChildID: string, updateChildDto: UpdateChildDto) {
    const child = await this.prisma.child.findUnique({
      where: {
        ChildID,
      },
    });

    if (!child) {
      throw new NotFoundException('Child not found');
    }

    return this.prisma.child.update({
      where: {
        ChildID,
      },
      data: updateChildDto,
    });
  }

  async deleteChild(ChildID: string) {
    const child = await this.prisma.child.findUnique({
      where: {
        ChildID,
      },
    });

    if (!child) {
      throw new NotFoundException('Child not found');
    }

    return this.prisma.child.delete({
      where: {
        ChildID,
      },
    });
  }
}
