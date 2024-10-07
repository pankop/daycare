import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodController } from './payment-method.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  imports: [PrismaModule],
})
export class PaymentMethodModule {}
