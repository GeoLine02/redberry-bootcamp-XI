import { Dispatch, SetStateAction } from "react";
import {
  CategoryFilterType,
  InstructorFIlterType,
  SelectedCourseFiltersType,
  TopicFilterType,
} from "../types";
import CategoryFilters from "./CategoryFilters";
import InstructorFilters from "./InstructorFilters";
import TopicFilters from "./TopicFilters";
import Image from "next/image";
import X from "@/public/X.svg";

interface FilterProps {
  categoryFilters: CategoryFilterType[];
  topicFilters: TopicFilterType[];
  instructorFilters: InstructorFIlterType[];
  selectedFilters: SelectedCourseFiltersType;
  setSelectedFilters: Dispatch<SetStateAction<SelectedCourseFiltersType>>;
  handleClearFilters: () => void;
}

export default function Filters({
  categoryFilters,
  instructorFilters,
  topicFilters,
  selectedFilters,
  setSelectedFilters,
  handleClearFilters,
}: FilterProps) {
  const totalSelectedFilters =
    selectedFilters.selectedCategoryIds.length +
    selectedFilters.selectedInstructorIds.length +
    selectedFilters.selectedTopicIds.length;

  return (
    <div className="w-full max-w-77.25">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-customBlack font-semibold">Filters</h1>
        <button
          onClick={handleClearFilters}
          className="flex gap-1 items-center cursor-pointer"
          aria-labelledby="remove all filters button"
        >
          <span className="text-medium-gray">Clear All Filters</span>
          <Image src={X} alt="close icon" />
        </button>
      </div>
      <div className="flex flex-col gap-14">
        <div className="mt-8">
          <span className="font-medium text-dark-gray">Categories</span>
          <CategoryFilters
            setSelectedFilters={setSelectedFilters}
            selectedFilterIds={selectedFilters.selectedCategoryIds}
            categoryFilters={categoryFilters}
          />
        </div>
        <div className="mt-8">
          <span className="font-medium text-dark-gray">Topics</span>
          <TopicFilters
            setSelectedFilters={setSelectedFilters}
            selectedFilterIds={selectedFilters.selectedTopicIds}
            topicFilters={topicFilters}
          />
        </div>
        <div className="mt-8">
          <span className="font-medium text-dark-gray">Instructors</span>
          <InstructorFilters
            setSelectedFilters={setSelectedFilters}
            selectedFilterIds={selectedFilters.selectedInstructorIds}
            instructorFilters={instructorFilters}
          />
        </div>
      </div>
      <div className="border-t-2 border-t-border-gray mt-6 pt-4">
        <span className="text-medium-gray">
          {totalSelectedFilters} Filters Active
        </span>
      </div>
    </div>
  );
}
