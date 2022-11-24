import CarEntity from "./Car.model";

export default interface Rent {
  id: number;
  clientId: number;
  amount: number;
  startDate: Date;
  finishDate: Date;
  rate: number;
  car: CarEntity;
  rentPerDay: boolean;
  kilometers: number;
}