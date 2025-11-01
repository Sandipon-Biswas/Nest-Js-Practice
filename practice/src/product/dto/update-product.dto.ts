import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['In Stock', 'Stock Out'])
  status?: string;

  @IsOptional()
  @IsNumber()
  discount?: number;
}
