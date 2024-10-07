import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentMethod } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentMethodDto } from './dtos/create-paymentMethod.dto';
import { UpdatePaymentMethodDto } from './dtos/update-paymentMethod.dto';
@Injectable()
export class PaymentMethodService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.paymentMethod.findMany();
  }

  async findoneBy(PaymentMethodNo: string) {
    if (!PaymentMethodNo) {
      throw new Error('Payment Method ID is required');
    }

    const paymentMethod = await this.prisma.paymentMethod.findUnique({
      where: {
        PaymentMethodNo,
      },
    });

    if (!paymentMethod) {
      throw new NotFoundException('Payment Method not found');
    }
    return paymentMethod;
  }

  async createPaymentMethod(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.create({
      data: createPaymentMethodDto,
    });
  }

  async updatePaymentMethod(
    PaymentMethodNo: string,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const paymentMethod = await this.prisma.paymentMethod.findUnique({
      where: {
        PaymentMethodNo,
      },
    });

    if (!paymentMethod) {
      throw new NotFoundException('Payment Method not found');
    }

    return this.prisma.paymentMethod.update({
      where: {
        PaymentMethodNo,
      },
      data: updatePaymentMethodDto,
    });
  }

  async deletePaymentMethod(PaymentMethodNo: string) {
    const paymentMethod = await this.prisma.paymentMethod.findUnique({
      where: {
        PaymentMethodNo,
      },
    });

    if (!paymentMethod) {
      throw new NotFoundException('Payment Method not found');
    }

    return this.prisma.paymentMethod.delete({
      where: {
        PaymentMethodNo,
      },
    });
  }
}
