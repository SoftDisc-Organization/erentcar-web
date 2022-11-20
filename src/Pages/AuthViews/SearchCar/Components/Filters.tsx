import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { CarCategory } from "../../../../Models/CarCategory.enum";
import SearchCarFilters from "../../../../Models/SearchCarFilters.model";

const priceRanges = [
  {
    name: "Menor a S/ 70",
    value: {
      min: 0,
      max: 70,
    },
  },
  {
    name: "S/ 70 a S/ 140",
    value: {
      min: 70,
      max: 140,
    },
  },
  {
    name: "S/ 140 a S/ 210",
    value: {
      min: 140,
      max: 210,
    },
  },
  {
    name: "S/ 210 a más",
    value: {
      min: 210,
      max: 1000000,
    },
  },
];

const carCategories = [
  {
    name: "Pequeño",
    value: CarCategory.LITTLE,
  },
  {
    name: "Mediano",
    value: CarCategory.MEDIUM,
  },
  {
    name: "Grande",
    value: CarCategory.LARGE,
  },
  {
    name: "Premium",
    value: CarCategory.PREMIUM,
  },
  {
    name: "Minivan",
    value: CarCategory.MINIVAN,
  },
  {
    name: "SUVS",
    value: CarCategory.SUVS,
  },
];

interface FiltersProps {
  filters: SearchCarFilters;
  showFilters: boolean;
  setSelectFilters: (filters: SearchCarFilters) => void;
  setShowFilters: () => void;
}

export const Filters = (props: FiltersProps) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState<any>(
    priceRanges.slice(0, 2)
  );
  const [selectedCarCategories, setSelectedCarCategories] = useState<any>(
    carCategories.slice(0, 3)
  );

  const onChangePriceFilter = (e: { value: any; checked: boolean }) => {
    const _selectedPriceRange = [...selectedPriceRange];
    if (e.checked) {
      _selectedPriceRange.push(e.value);
    } else {
      for (let i = 0; i < _selectedPriceRange.length; i++) {
        if (_selectedPriceRange[i].name === e.value.name) {
          _selectedPriceRange.splice(i, 1);
          break;
        }
      }
    }
    console.log(_selectedPriceRange, e);
    setSelectedPriceRange(_selectedPriceRange);
    props.setSelectFilters({
      priceRanges: _selectedPriceRange.map((selected) => selected.value),
      categories: props.filters.categories,
    });
  };

  const onChangeCarCategoryFilter = (e: { value: any; checked: boolean }) => {
    const _selectedCarCategories = [...selectedCarCategories];
    if (e.checked) {
      _selectedCarCategories.push(e.value);
    } else {
      for (let i = 0; i < _selectedCarCategories.length; i++) {
        if (_selectedCarCategories[i].name === e.value.name) {
          _selectedCarCategories.splice(i, 1);
          break;
        }
      }
    }
    setSelectedCarCategories(_selectedCarCategories);
    props.setSelectFilters({
      priceRanges: props.filters.priceRanges,
      categories: _selectedCarCategories.map((selected) => selected.value),
    });
  };

  return (
    <div className={"filter-menu " + (props.showFilters ? "active " : "")}>
      <div className="lg:hidden py-3 mb-3 relative border-b-2">
        <h1 className="text-center font-bold">Filtros</h1>
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-outlined p-button-text color-primary !absolute right-0 top-0"
          onClick={props.setShowFilters}
        />
      </div>
      <div className="bg-primary box-border p-4 rounded-lg">
        <h1 className="font-bold">Rango de precios</h1>
        <div>
          {priceRanges.map((priceRange) => (
            <div key={priceRange.name} className="mt-3">
              <Checkbox
                inputId={priceRange.name}
                name="priceFilter"
                value={priceRange}
                onChange={onChangePriceFilter}
                checked={selectedPriceRange.some(
                  (item: any) => item.name === priceRange.name
                )}
              />
              <label htmlFor={priceRange.name} className="ml-2">
                {priceRange.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-primary box-border p-4 rounded-lg mt-5">
        <h1 className="font-bold">Categorias de autos</h1>
        <div>
          {carCategories.map((carCategories) => (
            <div key={carCategories.name} className="mt-3">
              <Checkbox
                inputId={carCategories.name}
                name="priceFilter"
                value={carCategories}
                onChange={onChangeCarCategoryFilter}
                checked={selectedCarCategories.some(
                  (item: any) => item.name === carCategories.name
                )}
              />
              <label htmlFor={carCategories.name} className="ml-2">
                {carCategories.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
