import { PartialType } from '@nestjs/swagger';
import { CreateHospitalityDto } from './create-hospitality.dto';

export class UpdateHospitalityDto extends PartialType(CreateHospitalityDto) {}
