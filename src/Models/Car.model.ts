import CarModel from "./CarModel.model";
import { CarCategory } from "./CarCategory.enum";
import { MechanicConditions } from "./MechanicConditions.enum";
import Comment from "./Comment";

export default interface CarEntity {
  id: number;
  active: boolean;
  address: string;
  carModel: CarModel;
  carValueInDollars: number;
  category: CarCategory;
  extraInformation: string;
  imagePath: Array<string>;
  manual: boolean;
  mechanicConditions: MechanicConditions;
  mileage: number;
  rate: number;
  rentAmountDay: number;
  rentAmountKilometer: number;
  seating: number;
  year: number;
  comments: Comment[];
  clientId: number;
}
