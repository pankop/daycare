import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TakeCareService } from './take-care.service';
import { CreateTakeCareDto } from './dtos/create-takeCare.dto';
import { Take_Care } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EntityTypeGuard } from 'src/auth/guards/entity-type.guard';
import { EntityType } from 'src/auth/decorators/entity-type.decorator';

@Controller('take-care')
@UseGuards(JwtAuthGuard, EntityTypeGuard)
export class TakeCareController {
  constructor(private readonly takeCareService: TakeCareService) {}

  @Get()
  @EntityType('hospitality', 'parent', 'nanny')
  async findAll() {
    return this.takeCareService.findAll();
  }

  @Get(':id')
  @EntityType('hospitality', 'parent', 'nanny')
  async findOneById(@Param('id') id: string) {
    return this.takeCareService.findOneById(id);
  }

  @Post()
  @EntityType('hospitality')
  async create(
    @Body() createTakeCareDto: CreateTakeCareDto,
  ): Promise<Take_Care> {
    return this.takeCareService.create(createTakeCareDto);
  }

  @Put(':id')
  @EntityType('hospitality')
  async update(
    @Param('id') id: string,
    @Body() updateTakeCareDto: CreateTakeCareDto,
  ): Promise<Take_Care> {
    return this.takeCareService.update(id, updateTakeCareDto);
  }

  @Delete(':id')
  @EntityType('hospitality')
  async delete(@Param('id') id: string): Promise<Take_Care> {
    return this.takeCareService.delete(id);
  }

  @Get('child/:childId/nanny')
  @EntityType('hospitality', 'parent', 'nanny')
  async findNannyByChild(@Param('childId') childId: string) {
    return this.takeCareService.findNannyByChild(childId);
  }

  @Get('records')
  @EntityType('hospitality', 'parent', 'nanny')
  async findTakeCareRecords(
    @Query('childId') childId?: string,
    @Query('nannyId') nannyId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('paymentStatus') paymentStatus?: 'paid' | 'unpaid',
    @Query('childSex') childSex?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    if (childId) {
      return this.takeCareService.findTakeCareRecords(
        childId,
        undefined,
        start,
        end,
        paymentStatus,
        childSex,
        order,
      );
    }
    if (nannyId) {
      return this.takeCareService.findTakeCareRecords(
        undefined,
        nannyId,
        start,
        end,
        paymentStatus,
        childSex,
        order,
      );
    }
    if (startDate || endDate) {
      return this.takeCareService.findTakeCareRecords(
        undefined,
        undefined,
        start,
        end,
        paymentStatus,
        childSex,
        order,
      );
    }
    if (paymentStatus) {
      return this.takeCareService.findTakeCareRecords(
        undefined,
        undefined,
        start,
        end,
        paymentStatus,
        childSex,
        order,
      );
    }
    if (childSex) {
      return this.takeCareService.findTakeCareRecords(
        undefined,
        undefined,
        start,
        end,
        paymentStatus,
        childSex,
        order,
      );
    }
    if (sortBy) {
      return this.takeCareService.findTakeCareRecords(
        undefined,
        undefined,
        start,
        end,
        paymentStatus,
        childSex,
        order,
      );
    }
    return this.takeCareService.findTakeCareRecords(
      undefined,
      undefined,
      start,
      end,
      paymentStatus,
      childSex,
      order,
    );
  }
}
