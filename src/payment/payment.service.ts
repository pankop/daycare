import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Payment } from '@prisma/client';
import { CreatePaymentDto } from './dtos/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.payment.findMany();
  }

  async findOneById(PaymentNo: string) {
    if (!PaymentNo) {
      throw new Error('Payment ID is required');
    }

    const payment = await this.prisma.payment.findUnique({
      where: {
        PaymentNo,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async createPayment(ParentID: string, createPaymentDto: CreatePaymentDto) {
    const parent = await this.prisma.parent.findUnique({
      where: {
        ParentID,
      },
      include: {
        Child: true,
      },
    });

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    const child = parent.Child.find(
      (child) => child.ChildID === createPaymentDto.Ch_ID2,
    );

    if (!child) {
      throw new NotFoundException('Child not found');
    }

    const payment = await this.prisma.payment.create({
      data: createPaymentDto,
    });

    return payment;
  }
  async updatePayment(
    PaymentNo: string,
    updatePaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    const payment = await this.prisma.payment.findUnique({
      where: {
        PaymentNo,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return this.prisma.payment.update({
      where: {
        PaymentNo,
      },
      data: updatePaymentDto,
    });
  }

  async deletePayment(PaymentNo: string): Promise<Payment> {
    const payment = await this.prisma.payment.findUnique({
      where: {
        PaymentNo,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return this.prisma.payment.delete({
      where: {
        PaymentNo,
      },
    });
  }
}
