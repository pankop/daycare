import { IsIn, IsString } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsString()
  PaymentMethodNo: string;

  @IsIn(['Cash', 'Card'], {
    message: 'PaymentMethodName could be Cash or Card',
  })
  PaymentMethodName: string;
}
