import { IsEmail, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateParentDto {
  @IsEmail()
  Username: string;

  @IsString()
  Password: string;

  @IsString()
  P_FName: string;

  @IsString()
  @IsOptional()
  P_MName: string;

  @IsString()
  @IsOptional()
  P_LName: string;

  @IsNumber()
  P_Phone: string;

  @IsString()
  P_Address: string;

  @IsIn(['M', 'F', 'G'], { message: 'Relationship could be F, M, or G' })
  Relationship: string;
}
