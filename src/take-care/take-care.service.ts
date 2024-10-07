import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTakeCareDto } from './dtos/create-takeCare.dto';
import { Take_Care } from '@prisma/client';

@Injectable()
export class TakeCareService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const takeCares = await this.prisma.take_Care.findMany();
    return takeCares;
  }

  async findOneById(TakeCare_ID) {
    if (!TakeCare_ID) {
      throw new Error('Take Care ID is required');
    }

    const takeCare = await this.prisma.take_Care.findUnique({
      where: {
        TakeCare_ID,
      },
    });
    if (!takeCare) {
      throw new Error('Take Care not found');
    }
    return takeCare;
  }

  async create(createTakeCareDto: CreateTakeCareDto): Promise<Take_Care> {
    const payment = await this.prisma.payment.findUnique({
      where: { PaymentNo: createTakeCareDto.PaymentNo },
      include: { Child: true, Hospitality: true },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.Ch_ID2 !== createTakeCareDto.Ch_ID1) {
      throw new NotFoundException('Payment does not match the child');
    }

    const parent = await this.prisma.parent.findUnique({
      where: { ParentID: payment.Child.Parent_ID1 },
    });

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    return this.prisma.take_Care.create({
      data: createTakeCareDto,
    });
  }

  async update(
    TakeCare_ID: string,
    updateTakeCareDto: CreateTakeCareDto,
  ): Promise<Take_Care> {
    const takeCare = await this.prisma.take_Care.findUnique({
      where: {
        TakeCare_ID,
      },
    });
    if (!takeCare) {
      throw new NotFoundException('Take Care not found');
    }
    return this.prisma.take_Care.update({
      where: {
        TakeCare_ID,
      },
      data: updateTakeCareDto,
    });
  }

  async delete(TakeCare_ID: string): Promise<Take_Care> {
    const takeCare = await this.prisma.take_Care.findUnique({
      where: {
        TakeCare_ID,
      },
    });
    if (!takeCare) {
      throw new NotFoundException('Take Care not found');
    }
    return this.prisma.take_Care.delete({
      where: {
        TakeCare_ID,
      },
    });
  }

  async findNannyByChild(ChildID: string) {
    // Check if the Child exists
    const child = await this.prisma.child.findUnique({
      where: { ChildID },
    });

    if (!child) {
      throw new NotFoundException('Child not found');
    }

    // Find the Nanny taking care of the Child
    const takeCare = await this.prisma.take_Care.findMany({
      where: { Ch_ID1: ChildID },
      include: { Nanny: true },
    });

    if (takeCare.length === 0) {
      throw new NotFoundException('No Nanny found for this Child');
    }

    return takeCare.map((tc) => tc.Nanny);
  }

  async findTakeCareRecords(
    ChildID?: string,
    Nan_ID?: string,
    startDate?: Date,
    endDate?: Date,
    paymentStatus?: 'paid' | 'unpaid',
    childSex?: string,
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    // Build the filter object
    const filters: any = {};

    if (ChildID) {
      filters.Ch_ID1 = ChildID;
    }

    if (Nan_ID) {
      filters.Nan_ID = Nan_ID;
    }

    if (startDate && endDate) {
      filters.CareStartDate = {
        gte: startDate,
        lte: endDate,
      };
    }

    if (paymentStatus) {
      filters.Payment = {
        is: {
          status: paymentStatus === 'paid' ? 'PAID' : 'UNPAID',
        },
      };
    }

    if (childSex) {
      filters.Child = {
        is: {
          C_Sex: childSex,
        },
      };
    }

    // Validate sortOrder
    if (sortOrder !== 'asc' && sortOrder !== 'desc') {
      throw new BadRequestException('Invalid sort order');
    }

    // Find and sort Take_Care records based on filters
    const takeCareRecords = await this.prisma.take_Care.findMany({
      where: filters,
      orderBy: { CareStartDate: sortOrder },
      include: { Child: true, Nanny: true, Payment: true },
    });

    if (takeCareRecords.length === 0) {
      throw new NotFoundException('No Take_Care records found');
    }

    return takeCareRecords;
  }
}
