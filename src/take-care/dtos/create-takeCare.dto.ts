import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateTakeCareDto {
  @IsString()
  Nan_ID: string;

  @IsString()
  Ch_ID1: string;

  @Type(() => Date)
  @IsDate()
  CareStartDate: Date;

  @Type(() => Date)
  @IsDate()
  CareEndDate: Date;

  @IsString()
  PaymentNo: string;
}
