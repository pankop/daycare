import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NannyModule } from './nanny/nanny.module';
import { PrismaModule } from './prisma/prisma.module';
import { HospitalityModule } from './hospitality/hospitality.module';
import { ParentsModule } from './parents/parents.module';
import { ChildModule } from './child/child.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TakeCareModule } from './take-care/take-care.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NannyModule,
    PrismaModule,
    HospitalityModule,
    ParentsModule,
    ChildModule,
    PaymentModule,
    PaymentMethodModule,
    AuthModule,
    TakeCareModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
