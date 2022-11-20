import Car from "./Car.model";

export default interface Favourite {
  id: number;
  clientId: number;
  car: Car;
}
