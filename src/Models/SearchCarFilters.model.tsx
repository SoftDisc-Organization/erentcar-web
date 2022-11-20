import { CarCategory } from "./CarCategory.enum";
import PriceRange from "./PriceRange.model";

export default interface SearchCarFilters {
  priceRanges: PriceRange[];
  categories: CarCategory[];
}