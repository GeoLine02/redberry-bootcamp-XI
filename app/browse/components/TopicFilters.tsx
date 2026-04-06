import { Dispatch, SetStateAction } from "react";
import { SelectedCourseFiltersType, TopicFilterType } from "../types";

interface TopicFiltersProps {
  topicFilters: TopicFilterType[];
  selectedFilterIds: number[];
  setSelectedFilters: Dispatch<SetStateAction<SelectedCourseFiltersType>>;
}

export default function TopicFilters({
  topicFilters,
  selectedFilterIds,
  setSelectedFilters,
}: TopicFiltersProps) {
  const handleSelectFilter = (filterId: number) => {
    setSelectedFilters((prev) => ({
      ...prev,
      selectedTopicIds: prev.selectedTopicIds.includes(filterId)
        ? prev.selectedTopicIds.filter((id) => id !== filterId) // remove if exists
        : [...prev.selectedTopicIds, filterId], // add if not exists
    }));
  };

  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {topicFilters.map((filter) => {
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
