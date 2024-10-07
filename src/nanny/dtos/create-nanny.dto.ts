import {
  IsDate,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateNannyDto {
  @IsEmail()
  Username: string;

  @IsString()
  Password: string;

  @IsString()
  N_FName: string;

  @IsString()
  @IsOptional()
  N_MName: string;

  @IsString()
  @IsOptional()
  N_LName: string;

  @IsNumber()
  N_Phone: string;

  @Type(() => Date)
  @IsDate({ message: 'N_BDate must be a valid date' })
  N_BDate: Date;

  @IsIn(['M', 'F'], { message: 'N_Sex must be M or F' })
  N_Sex: string;

  @IsString()
  N_Address: string;

  @IsNumber()
  N_Salary: number;

  @IsIn(['Y', 'N'], { message: 'N_EnglishSkill must be Y or N' })
  EnglishSkill: string;

  @IsIn(['Y', 'N'], { message: 'N_MandarinSkill must be Y or N' })
  MandarinSkill: string;

  @Type(() => Date)
  @IsDate({ message: 'N_HireDate must be a valid date' })
  N_HireDate: Date;
}
