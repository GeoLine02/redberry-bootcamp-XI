"use client";

import DropDown from "@/ui/DropDown";
import { SortType } from "../../types";

interface SortCoursesProps {
  coursesCount: number;
  totalPages: number;
  selectedSort: SortType;
  sortOptions: SortType[];
  onSort: (option: SortType) => void;
}

export default function SortCourses({
  coursesCount,
  onSort,
  selectedSort,
  sortOptions,
  totalPages,
}: SortCoursesProps) {
  return (
    <div className="w-full flex items-center justify-between">
      <span>
        Showing {coursesCount} out of {totalPages}
      </span>
      <DropDown className="min-w-58.5 max-w-fit">
        <DropDown.Trigger className="bg-white border-0!">
          <span className="font-medium">Sort By: </span>{" "}
          {selectedSort?.label.length && (
            <span className="font-medium text-primary-purple">
              {selectedSort?.label}
            </span>
          )}
        </DropDown.Trigger>
        <DropDown.Menu className="border">
          {sortOptions.map((option) => (
            <DropDown.Item onSelect={() => onSort(option)} key={option.value}>
              {option.label}
            </DropDown.Item>
          ))}
        </DropDown.Menu>
      </DropDown>
    </div>
  );
}
