import { Dispatch, SetStateAction } from "react";
import { CategoryFilterType, SelectedCourseFiltersType } from "../types";

interface CategoryFiltersProps {
  categoryFilters: CategoryFilterType[];
  selectedFilterIds: number[];
  setSelectedFilters: Dispatch<SetStateAction<SelectedCourseFiltersType>>;
}

export default function CategoryFilters({
  categoryFilters,
  selectedFilterIds,
  setSelectedFilters,
}: CategoryFiltersProps) {
  const handleSelectFilter = (filterId: number) => {
    setSelectedFilters((prev) => ({
      ...prev,
      selectedCategoryIds: prev.selectedCategoryIds.includes(filterId)
        ? prev.selectedCategoryIds.filter((id) => id !== filterId) // remove if exists
        : [...prev.selectedCategoryIds, filterId], // add if not exists
    }));
  };

  return (
    <div className="flex items-center flex-wrap gap-2 mt-6">
      {categoryFilters.map((filter) => {
        const isSelected = selectedFilterIds.includes(filter.id);

        return (
          <button
            onClick={() => handleSelectFilter(filter.id)}
            key={filter.id}
            className={`font-medium p-2 rounded-xl cursor-pointer transition
                border border-white
              ${
                isSelected
                  ? "bg-light-purple text-primary-purple border-light-purple!"
                  : "bg-white text-dark-gray hover:bg-light-purple hover:text-primary-purple  hover:border-primary-purple"
              }`}
          >
            {filter.name}
          </button>
        );
      })}
    </div>
  );
}
