import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from '../interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from '../dto/create-car.dto';
import { UUID } from 'crypto';
import { UpdateCarDto } from '../dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corola',
    // },
  ];

  findAllCars() {
    return { cars: this.cars };
  }

  findOneCarById(idCar: string) {
    const car = this.cars.find((car) => car.id === idCar);

    if (!car)
      throw new NotFoundException(`Car with id ${idCar} haven't been found`);

    return {
      car,
    };
  }

  createCar(carDto: CreateCarDto) {
    this.cars.push({
      id: uuid(),
      brand: carDto.brand,
      model: carDto.model,
    });
    return { cars: this.cars };
  }

  deleteCar(id: UUID) {
    this.findOneCarById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }

  updateCar(id: string, updateCarDto: UpdateCarDto) {
    const carIndex: number = this.cars.findIndex((cars) => cars.id === id);
    if (carIndex < 0)
      throw new NotFoundException(`Param id with ${id} haven't been found`);
    if (this.cars[carIndex].id !== updateCarDto.id) id = updateCarDto.id;
    this.cars[carIndex] = {
      ...this.cars[carIndex],
      ...updateCarDto,
      id,
    };
    return this.cars[carIndex];
  }
  fillCarsWithSeddData(cars: Car[]) {
    this.cars = cars;
  }
}
