import CarEntity from "./Car.model";
import Favourite from "./Favourite.model";
import Rent from "./Rent.model";

export default interface User {
  id: number;
  address: string;
  averageResponsibility: number;
  cellphoneNumber: number;
  accumulatedKilometers: number;
  imagePath: string;
  lastNames: string;
  names: string;
  rate: number;
  responseTime: number;
  planId: number;
  userId: number;
  cars: CarEntity[];
  favourites: Favourite[];
  rents: Rent[];
}
