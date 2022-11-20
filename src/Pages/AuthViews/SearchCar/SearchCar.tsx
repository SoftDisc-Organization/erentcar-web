import { Button } from "primereact/button";
import { useState } from "react";
import { CarCategory } from "../../../Models/CarCategory.enum";
import SearchCarFilters from "../../../Models/SearchCarFilters.model";
import Cars from "./Components/Cars";
import Filters from "./Components/Filters";

export const SearchCar = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    priceRanges: [
      { min: 0, max: 70 },
      { min: 70, max: 140 },
    ],
    categories: [CarCategory.LITTLE, CarCategory.MEDIUM, CarCategory.LARGE],
  } as SearchCarFilters);

  return (
    <div className="flex mx-auto w-full max-w-[840px] mt-5">
      <Filters
        filters={selectedFilters}
        showFilters={showFilters}
        setSelectFilters={setSelectedFilters}
        setShowFilters={() => setShowFilters(!showFilters)}
      />
      <Cars filters={selectedFilters} />
      <Button
        icon="pi pi-filter"
        label="Filtros"
        className="lg:!hidden !fixed w-[120px] bottom-0 left-1/2 !ml-[-60px] !mb-5 btn-primary"
        onClick={() => setShowFilters(!showFilters)}
      />
    </div>
  );
};

export default SearchCar;
