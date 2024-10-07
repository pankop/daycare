import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @Type(() => Date)
  @IsDate({ message: 'PaymentDate must be a valid date' })
  PaymentDate: Date;

  @IsNumber()
  TotalAmount: number;

  @IsString()
  Hos_ID: string;

  @IsString()
  Ch_ID2: string;

  @IsString()
  PaymentMethod_ID: string;
}
