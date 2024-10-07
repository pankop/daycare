import { Module } from '@nestjs/common';
import { NannyService } from './nanny.service';
import { NannyController } from './nanny.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [NannyController],
  providers: [NannyService],
  imports: [PrismaModule],
  exports: [NannyService],
})
export class NannyModule {}
