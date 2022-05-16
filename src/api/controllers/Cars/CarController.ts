import {Body, HttpCode, Get, Post, JsonController } from "routing-controllers";
import vinDecoder from "vin-decode";

import { Car } from "../../models";
import { CarCreateRequest } from "../../requests/Cars/CarCreateRequest";

@JsonController("/cars")
export class CarController {
  @Get()
  get(): Promise<Car[]> {
    return Car.find();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: CarCreateRequest) {
    if(!vinDecoder(body.vin)) throw new Error("Vin is not valid.");
    const car =  new Car();
    Object.assign(car, body);
    return await car.save();
  }
}
