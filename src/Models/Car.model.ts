import CarModel from "./CarModel.model";
import { CarCategory } from "./CarCategory.enum";
import { MechanicConditions } from "./MechanicConditions.enum";

export default interface CarEntity {
  id: number;
  active: boolean;
  address: string;
  carModel: CarModel;
  carValueInDollars: number;
  category: CarCategory;
  extraInformation: string;
  imagePath: string;
  manual: boolean;
  mechanicConditions: MechanicConditions;
  mileage: number;
  rate: number;
  rentAmountDay: number;
  seating: number;
  year: number;
  clientId: number;
}
