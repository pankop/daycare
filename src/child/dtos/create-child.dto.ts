import { Type } from 'class-transformer';
import { IsDate, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateChildDto {
  @IsString()
  C_FName: string;

  @IsString()
  @IsOptional()
  C_MName: string;

  @IsString()
  @IsOptional()
  C_LName: string;

  @Type(() => Date)
  @IsDate()
  C_BDate: Date;

  @IsIn(['M', 'F'], { message: 'Sex could be F or M' })
  C_Sex: string;

  @IsString()
  Parent_ID1: string;
}
