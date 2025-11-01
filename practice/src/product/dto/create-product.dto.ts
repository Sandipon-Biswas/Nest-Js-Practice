import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsMongoId()
  category: string;
}
