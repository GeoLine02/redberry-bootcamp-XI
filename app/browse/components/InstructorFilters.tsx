import Image from "next/image";
import { InstructorFIlterType, SelectedCourseFiltersType } from "../types";
import { Dispatch, SetStateAction } from "react";

interface InstructorFiltersProps {
  instructorFilters: InstructorFIlterType[];
  selectedFilterIds: number[];
  setSelectedFilters: Dispatch<SetStateAction<SelectedCourseFiltersType>>;
}

export default function InstructorFilters({
  instructorFilters,
  selectedFilterIds,
  setSelectedFilters,
}: InstructorFiltersProps) {
  const handleSelectFilter = (filterId: number) => {
    setSelectedFilters((prev) => ({
      ...prev,
      selectedInstructorIds: prev.selectedInstructorIds.includes(filterId)
        ? prev.selectedInstructorIds.filter((id) => id !== filterId) // remove if exists
        : [...prev.selectedInstructorIds, filterId], // add if not exists
    }));
  };

  return (
    <div className="flex flex-col gap-2 mt-6">
      {instructorFilters.map((filter) => {
        const isSelected = selectedFilterIds.includes(filter.id);

        return (
          <button
            onClick={() => handleSelectFilter(filter.id)}
            key={filter.id}
            className={`flex items-center py-2 px-3 w-fit rounded-xl gap-2 cursor-pointer transition
              border border-white
             ${
               isSelected
                 ? "bg-light-purple!  border-light-purple!"
                 : "bg-white text-dark-gray hover:bg-light-purple hover:text-primary-purple  hover:border-primary-purple"
             }`}
          >
            <Image
              width={100}
              height={100}
              className="max-w-7.5 aspect-square object-cover rounded-sm"
              src={filter.avatar}
              alt={filter.name}
            />

            <span
              className={`font-medium ${
                isSelected ? "text-primary-purple!" : "text-dark-gray"
              }`}
            >
              {filter.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
