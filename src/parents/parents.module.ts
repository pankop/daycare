import { Module } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ParentsController],
  providers: [ParentsService],
  imports: [PrismaModule],
  exports: [ParentsService],
})
export class ParentsModule {}
