import { PartialType } from '@nestjs/swagger';
import { CreateTakeCareDto } from './create-takeCare.dto';

export class UpdateTakeCareDto extends PartialType(CreateTakeCareDto) {}
