import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HospitalityService } from './hospitality.service';
import { CreateHospitalityDto } from './dtos/create-hospitality.dto';
import { UpdateHospitalityDto } from './dtos/update-hospitality.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EntityTypeGuard } from '../auth/guards/entity-type.guard';
import { EntityType } from 'src/auth/decorators/entity-type.decorator';
@Controller('hospitality')
@UseGuards(JwtAuthGuard, EntityTypeGuard) // Menggunakan kedua guard
export class HospitalityController {
  constructor(private readonly hospitalityService: HospitalityService) {}

  @Get()
  @EntityType('hospitality') // Hanya Hospitality yang bisa akses
  async findAll() {
    return this.hospitalityService.findAll();
  }

  @Get(':hostId')
  @EntityType('hospitality') // Hanya Hospitality yang bisa akses
  async findOneById(@Param('hostId') hostId: string) {
    return this.hospitalityService.findOneById(hostId);
  }

  @Post()
  @EntityType('hospitality') // Hanya Hospitality yang bisa akses
  async createHospitality(@Body() createHospitalityDto: CreateHospitalityDto) {
    return this.hospitalityService.createHospitality(createHospitalityDto);
  }

  @Put(':hostId')
  @EntityType('hospitality') // Hanya Hospitality yang bisa akses
  async updateHospitality(
    @Param('hostId') hostId: string,
    @Body() updateHospitalityDto: UpdateHospitalityDto,
  ) {
    return this.hospitalityService.updateHospitality(
      hostId,
      updateHospitalityDto,
    );
  }

  @Delete(':hospitalityId')
  @EntityType('hospitality')
  async deleteHospitality(@Param('hospitalityId') hospitalityId: string) {
    return this.hospitalityService.removeHospitality(hospitalityId);
  }

  @Get('search')
  @EntityType('hospitality')
  async searchHospitalityByName(@Query('name') name: string) {
    return this.hospitalityService.searchHospitalityByName(name);
  }

  @Get('sorted/:HostID')
  @EntityType('hospitality')
  async getHospitalitySorted(
    @Param('HostID') HostID: string,
    @Query('sortBy') sortBy: string,
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.hospitalityService.getHospitalitySorted(HostID, sortBy, order);
  }
}
