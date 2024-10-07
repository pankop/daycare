import { Module } from '@nestjs/common';
import { TakeCareService } from './take-care.service';
import { TakeCareController } from './take-care.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TakeCareController],
  providers: [TakeCareService],
  imports: [PrismaModule],
  exports: [TakeCareService],
})
export class TakeCareModule {}
