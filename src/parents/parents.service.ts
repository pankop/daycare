import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParentDto } from './dtos/create-parent.dto';
import { UpdateParentDto } from './dtos/update-parent.dto';
import { Parent } from '@prisma/client';
import { subYears } from 'date-fns';

@Injectable()
export class ParentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const parents = await this.prisma.parent.findMany();
    return parents;
  }

  async findoneById(ParentID: string) {
    if (!ParentID) {
      throw new Error('Parent ID is required');
    }

    const parent = await this.prisma.parent.findUnique({
      where: {
        ParentID,
      },
    });

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }
    return parent;
  }

  async createParent(createParentDto: CreateParentDto): Promise<Parent> {
    return this.prisma.parent.create({
      data: createParentDto,
    });
  }

  async updateParent(
    ParentID: string,
    updateParentDto: UpdateParentDto,
  ): Promise<Parent> {
    return this.prisma.parent.update({
      where: { ParentID },
      data: updateParentDto,
    });
  }

  async deleteParent(ParentID: string): Promise<Parent> {
    return this.prisma.parent.delete({
      where: { ParentID },
    });
  }

  async searchParentByName(name: string) {
    return this.prisma.parent.findMany({
      where: {
        OR: [
          { P_FName: { contains: name, mode: 'insensitive' } },
          { P_MName: { contains: name, mode: 'insensitive' } },
          { P_LName: { contains: name, mode: 'insensitive' } },
        ],
      },
    });
  }

  async getParentSorted(
    ParentID: string,
    sortBy: string,
    order: 'asc' | 'desc' = 'asc',
  ) {
    const validSortFields = ['P_FName', 'P_BDate', 'P_Sex'];
    if (!validSortFields.includes(sortBy)) {
      throw new Error(`invalid sort field: ${sortBy}`);
    }
    return this.prisma.parent.findMany({
      where: { ParentID: ParentID },
      orderBy: { [sortBy]: order },
    });
  }

  async getChildrenByParentID(ParentID: string) {
    return this.prisma.parent.findUnique({
      where: { ParentID }, //perlu diganti karena ini haruse
      include: { Child: true },
    });
  }

  async getChildrenByName(ParentID: string, name: string) {
    return this.prisma.child.findMany({
      where: {
        Parent_ID1: ParentID,
        OR: [
          { C_FName: { contains: name, mode: 'insensitive' } },
          { C_MName: { contains: name, mode: 'insensitive' } },
          { C_LName: { contains: name, mode: 'insensitive' } },
        ],
      },
    });
  }

  async getChildrenByAgeRange(
    ParentID: string,
    minAge?: number,
    maxAge?: number,
  ) {
    const today = new Date();
    return this.prisma.child.findMany({
      where: {
        Parent_ID1: ParentID,
        C_BDate: {
          gte: maxAge ? subYears(today, maxAge) : undefined,
          lte: minAge ? subYears(today, minAge) : undefined,
        },
      },
    });
  }

  async getChildrenByBirthDateRange(
    ParentID: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    return this.prisma.child.findMany({
      where: {
        Parent_ID1: ParentID,
        C_BDate: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  }

  async getChildrenByGender(ParentID: string, gender: string) {
    return this.prisma.child.findMany({
      where: {
        Parent_ID1: ParentID,
        C_Sex: gender,
      },
    });
  }

  async getChildrenSorted(
    ParentID: string,
    sortBy: string,
    order: 'asc' | 'desc' = 'asc',
  ) {
    const validSortFields = ['C_FName', 'C_BDate', 'C_Sex'];
    if (!validSortFields.includes(sortBy)) {
      throw new Error(`invalid sort field: ${sortBy}`);
    }

    return this.prisma.child.findMany({
      where: { Parent_ID1: ParentID },
      orderBy: { [sortBy]: order },
    });
  }
}
