import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ChildService } from './child.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EntityType } from '../auth/decorators/entity-type.decorator';
import { EntityTypeGuard } from '../auth/guards/entity-type.guard';
import { CreateChildDto } from './dtos/create-child.dto';
import { UpdateChildDto } from './dtos/update-child.dto';

@Controller('children')
@UseGuards(JwtAuthGuard, EntityTypeGuard)
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @Get()
  @EntityType('parent', 'nanny', 'hospitality')
  async findAll() {
    return this.childService.findAll();
  }

  @Get(':childId')
  @EntityType('parent', 'nanny', 'hospitality')
  async findOneById(@Param('childId') childId: string) {
    return this.childService.findoneById(childId);
  }

  @Post()
  @EntityType('hospitality')
  async createChild(@Body() createChildDto: CreateChildDto) {
    return this.childService.createChild(createChildDto);
  }

  @Put(':childId')
  @EntityType('hospitality') // Hanya Hospitality yang bisa akses
  async updateChild(
    @Param('childId') childId: string,
    @Body() updateChildDto: UpdateChildDto,
  ) {
    return this.childService.updateChild(childId, updateChildDto);
  }

  @Delete(':childId')
  @EntityType('hospitality') // Hanya Hospitality yang bisa akses
  async deleteChild(@Param('childId') childId: string) {
    return this.childService.deleteChild(childId);
  }
}
