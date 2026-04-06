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
  console.log(categoryFilters);

  return (
    <div className="w-full max-w-77.25">
      <h1 className="text-3xl text-customBlack font-semibold">Filters</h1>
      <div className="mt-8">
        <span className="font-medium text-dark-gray">Categories</span>
        <div className="flex items-center flex-wrap gap-2 mt-6">
          {categoryFilters.map((filter) => (
            <span
              className="font-medium text-dark-gray bg-white p-2 rounded-xl"
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
