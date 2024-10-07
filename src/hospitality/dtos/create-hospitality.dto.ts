import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHospitalityDto {
  @IsEmail()
  Username: string;

  @IsString()
  Password: string;

  @IsString()
  H_FName: string;

  @IsString()
  @IsOptional()
  H_MName: string;

  @IsString()
  @IsOptional()
  H_LName: string;

  @IsNumber()
  H_Phone: string;

  @Type(() => Date)
  @IsDate({ message: 'H_BDate must be a valid date' })
  H_BDate: Date;

  @IsIn(['M', 'F'], { message: 'H_Sex must be M or F' })
  H_Sex: string;

  @IsNumber()
  H_Salary: number;

  @Type(() => Date)
  @IsDate({ message: 'H_HireDate must be a valid date' })
  H_HireDate: Date;
}
