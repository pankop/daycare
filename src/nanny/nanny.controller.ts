import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { NannyService } from './nanny.service';
import { CreateNannyDto } from './dtos/create-nanny.dto';
import { UpdateNannyDto } from './dtos/update-nanny.dto';
import { EntityType } from 'src/auth/decorators/entity-type.decorator';
import { EntityTypeGuard } from 'src/auth/guards/entity-type.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(EntityTypeGuard, JwtAuthGuard)
@Controller('nanny')
export class NannyController {
  constructor(private readonly nannyService: NannyService) {}

  @Get()
  @EntityType('nanny', 'hospitality')
  findAll() {
    return this.nannyService.findAll();
  }

  @Get(':NanID')
  @EntityType('nanny', 'hospitality')
  findOne(@Param('NanID') NanID: string) {
    return this.nannyService.findoneBy(NanID);
  }

  @Post()
  @EntityType('hospitality')
  create(@Body() createNannyDto: CreateNannyDto) {
    return this.nannyService.createNanny(createNannyDto);
  }

  @Put(':NanID')
  @EntityType('hospitality')
  update(
    @Param('NanID') NanID: string,
    @Body() updateNannyDto: UpdateNannyDto,
  ) {
    return this.nannyService.updateNanny(NanID, updateNannyDto);
  }

  @Delete(':NanID')
  @EntityType('hospitality')
  remove(@Param('NanID') NanID: string) {
    return this.nannyService.removeNanny(NanID);
  }

  @Get('search/:name')
  @EntityType('hospitality')
  search(@Param('name') name: string) {
    return this.nannyService.searchNannyByName(name);
  }

  @Get('sorted/:NanID')
  @EntityType('hospitality')
  getNannySorted(
    @Param('NanID') NanID: string,
    @Query('sortBy') sortBy: string,
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.nannyService.getNannySorted(NanID, sortBy, order);
  }
}
