import { Injectable } from '@nestjs/common';
import { CarsService } from '../../cars/services/cars.service';
import { CARS_SEED } from '../data/cars.seed';
import { BrandsService } from '../../brands/services/brands.service';
import { BRANDS_SEED } from '../data/brands.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ) {}
  populateDB() {
    this.carsService.fillCarsWithSeddData(CARS_SEED);
    this.brandsService.fillBrandsWithSeedData(BRANDS_SEED);
    return `SEED's just executed`;
  }
}
