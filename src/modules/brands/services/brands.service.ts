import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { Brand } from '../entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime(),
      updatedAt: null,
    },
  ];

  create(createBrandDto: CreateBrandDto) {
    const newBrand: Brand = {
      id: uuid(),
      name: createBrandDto.name,
      createdAt: new Date().getTime(),
      updatedAt: null,
    };
    this.brands.push(newBrand);
    return { newBrand };
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand)
      throw new NotFoundException(`Brand with id ${id} haven't been found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandUp: Brand = this.findOne(id);
    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandUp.updatedAt = new Date().getTime();
        brandUp = {
          ...brandUp,
          ...updateBrandDto,
        };
        return brand;
      }
      return brand;
    });
  }

  remove(id: string) {
    this.findOne(id);
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return { message: `The brand with id ${id} has been removed` };
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
