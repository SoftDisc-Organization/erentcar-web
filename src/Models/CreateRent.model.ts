export default interface CreateRent {
  amount: number;
  startDate: Date;
  finishDate: Date;
  rate: number;
  rentPerDay: boolean;
  kilometers: number;
  carId: number;
}