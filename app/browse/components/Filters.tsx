import {
  CategoryFilterType,
  InstructorFIlterType,
  TopicFilterType,
} from "../types";

interface FilterProps {
  categoryFilters: CategoryFilterType[];
  topicFilters: TopicFilterType[];
  instructorFilters: InstructorFIlterType[];
}

export default function Filters({
  categoryFilters,
  instructorFilters,
  topicFilters,
}: FilterProps) {
  return (
    <div className="w-full max-w-77.25">
      <h1 className="text-3xl text-customBlack font-semibold">Filters</h1>
      <div>
        <span className="font-medium text-dark-gray">Categories</span>
        <div className="flex items-center flex-wrap">
          {categoryFilters.map((filter) => (
            <span
              className="font-medium text-dark-gray bg-white p-2"
              key={filter.id}
            >
              {filter.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
