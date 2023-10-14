// import { PartialType } from '@nestjs/mapped-types';
// import { CreateBrandDto } from './create-brand.dto';
// //PartialType es que todo sea opcional
// export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBrandDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
