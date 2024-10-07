import { Module } from '@nestjs/common';
import { HospitalityService } from './hospitality.service';
import { HospitalityController } from './hospitality.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [HospitalityController],
  providers: [HospitalityService],
  imports: [PrismaModule],
  exports: [HospitalityService],
})
export class HospitalityModule {}
