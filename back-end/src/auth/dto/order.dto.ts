import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @IsNumber()
  @IsNotEmpty()
  id_Cus: number;

  @IsNumber()
  @IsNotEmpty()
  id_Staff: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  shipping_fee?: number;

  @IsNumber()
  total?: number;

  canceled_at?: string;

  completed_at?: string;

  delivery_at?: string;
}
