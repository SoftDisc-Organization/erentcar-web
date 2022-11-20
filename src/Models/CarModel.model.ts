import CarBrand from "./CarBrand.model";

export default interface CarModel {
  id: number;
  carBrand: CarBrand;
  imagePath: string;
  name: string;
}