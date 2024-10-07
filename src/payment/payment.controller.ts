import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EntityTypeGuard } from 'src/auth/guards/entity-type.guard';
import { EntityType } from 'src/auth/decorators/entity-type.decorator';
import { CreatePaymentDto } from './dtos/create-payment.dto';

@Controller('payment')
@UseGuards(JwtAuthGuard, EntityTypeGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @EntityType('hospitality')
  async findAll() {
    return this.paymentService.findAll();
  }

  @Get(':PaymentNo')
  @EntityType('hospitality')
  async findOneById(@Param('paymentNo') paymentNo: string) {
    return this.paymentService.findOneById(paymentNo);
  }

  @Post(':paymentNo')
  @EntityType('hospitality')
  async createPayment(
    @Param('paymentNo') paymentNo: string,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentService.createPayment(paymentNo, createPaymentDto);
  }
}
