import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ParentsService } from './parents.service';
import { CreateParentDto } from './dtos/create-parent.dto';
import { UpdateParentDto } from './dtos/update-parent.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EntityTypeGuard } from 'src/auth/guards/entity-type.guard';
import { EntityType } from 'src/auth/decorators/entity-type.decorator';

@Controller('parents')
@UseGuards(JwtAuthGuard, EntityTypeGuard)
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @Get()
  @EntityType('hospitality')
  async findAll() {
    return this.parentsService.findAll();
  }

  @Get(':parentId')
  @EntityType('parent', 'hospitality')
  async findOneById(@Param('parentId') parentId: string) {
    return this.parentsService.findoneById(parentId);
  }

  @Post()
  @EntityType('hospitality')
  async createParent(@Body() createParentDto: CreateParentDto) {
    return this.parentsService.createParent(createParentDto);
  }

  @Put(':parentId')
  @EntityType('hospitality')
  async updateParent(
    @Param('parentId') parentId: string,
    @Body() updateParentDto: UpdateParentDto,
  ) {
    return this.parentsService.updateParent(parentId, updateParentDto);
  }

  @Delete(':parentId')
  @EntityType('hospitality')
  async deleteParent(@Param('parentId') parentId: string) {
    return this.parentsService.deleteParent(parentId);
  }

  @Get('search/:name')
  @EntityType('hospitality')
  async searchParentByName(@Query('name') name: string) {
    return this.parentsService.searchParentByName(name);
  }

  @Get('sorted/:ParentID')
  @EntityType('hospitality')
  async getParentSorted(
    @Param('ParentID') ParentID: string,
    @Query('sortBy') sortBy: string,
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.parentsService.getParentSorted(ParentID, sortBy, order);
  }

  @Get(':parentId/children')
  @EntityType('hospitality', 'parent', 'nanny')
  async getChildrenByParentId(
    @Param('parentId') parentId: string,
    @Query('name') name?: string,
    @Query('minAge') minAge?: number,
    @Query('maxAge') maxAge?: number,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
    @Query('gender') gender?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    if (name) {
      return this.parentsService.getChildrenByName(parentId, name);
    }
    if (minAge || maxAge) {
      return this.parentsService.getChildrenByAgeRange(
        parentId,
        minAge,
        maxAge,
      );
    }
    if (startDate || endDate) {
      return this.parentsService.getChildrenByBirthDateRange(
        parentId,
        startDate,
        endDate,
      );
    }
    if (gender) {
      return this.parentsService.getChildrenByGender(parentId, gender);
    }
    if (sortBy) {
      return this.parentsService.getChildrenSorted(parentId, sortBy, order);
    }
    return this.parentsService.getChildrenByParentID(parentId);
  }
}
