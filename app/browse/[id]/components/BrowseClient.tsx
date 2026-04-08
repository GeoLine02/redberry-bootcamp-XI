"use client";

import { CoursesWithPagination, CourseType } from "@/shared/types";
import { useEffect, useState } from "react";
import { getCourses } from "../../services";
import CoursesList from "../../components/CoursesList";
import Filters from "../../components/Filters";
import DropDown from "@/ui/DropDown";
import {
  CategoryFilterType,
  InstructorFIlterType,
  SelectedCourseFiltersType,
  SortType,
  TopicFilterType,
} from "../../types";
import { sortOptionsData } from "../../data";
import Pagination from "@/app/(home)/components/Pagination";

interface BrowseClientProps {
  coursesData: CoursesWithPagination;
  categoryFilters: CategoryFilterType[];
  topicFilters: TopicFilterType[];
  instructorFilters: InstructorFIlterType[];
}

export default function BrowseClient({
  coursesData,
  categoryFilters,
  instructorFilters,
  topicFilters,
}: BrowseClientProps) {
  const [courses, setCourses] = useState<CourseType[]>(coursesData.data ?? []);
  const [currentPage, setCurrentPage] = useState(coursesData.meta.currentPage);
  const [lastPage, setLastPage] = useState(coursesData.meta.lastPage);
  const [totalPages, setTotalPages] = useState(coursesData.meta.total);

  const [selectedFilters, setSelectedFilters] =
    useState<SelectedCourseFiltersType>({
      selectedCategoryIds: [],
      selectedInstructorIds: [],
      selectedTopicIds: [],
    });
  const [selectedSort, setSelectedSort] = useState<SortType>({
    label: "Newest",
    value: "newest",
  });
  const handleChangePage = async (page: number) => {
    try {
      const res = await getCourses(page);
      setCourses(res.data);
      setCurrentPage(res.meta.currentPage);
      setLastPage(res.meta.lastPage);
      setTotalPages(res.meta.total);
    } catch (error) {
      console.log(error);
    }
  };

  const onSort = async (sortOption: SortType) => {
    try {
      const res = await getCourses(currentPage, sortOption.value);
      setCourses(res.data);
      setCurrentPage(res.meta.currentPage);
      setLastPage(res.meta.lastPage);
      setTotalPages(res.meta.total);
      setSelectedSort(sortOption);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      selectedCategoryIds: [],
      selectedInstructorIds: [],
      selectedTopicIds: [],
    });
  };

  useEffect(() => {
    const handleFilterCourses = async () => {
      try {
        const res = await getCourses(
          1,
          selectedSort?.value,
          "",
          selectedFilters.selectedCategoryIds,
          selectedFilters.selectedTopicIds,
          selectedFilters.selectedInstructorIds,
        );
        setCourses(res.data);
        setCurrentPage(res.meta.currentPage);
        setLastPage(res.meta.lastPage);
        setTotalPages(res.meta.total);
      } catch (error) {
        console.log(error);
      }
    };

    handleFilterCourses();
  }, [
    selectedFilters.selectedCategoryIds,
    selectedFilters.selectedInstructorIds,
    selectedFilters.selectedTopicIds,
    selectedSort?.value,
  ]);

  return (
    <div>
      <div className="flex gap-22.5 mt-8.5">
        <Filters
          categoryFilters={categoryFilters}
          instructorFilters={instructorFilters}
          topicFilters={topicFilters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          handleClearFilters={handleClearFilters}
        />
        <div className="flex flex-col gap-8 items-center">
          <div className="w-full flex items-center justify-between">
            <span>
              Showing {courses.length} out of {totalPages}
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
                {sortOptionsData.map((option) => (
                  <DropDown.Item
                    onSelect={() => onSort(option)}
                    key={option.value}
                  >
                    {option.label}
                  </DropDown.Item>
                ))}
              </DropDown.Menu>
            </DropDown>
          </div>
          <CoursesList courses={courses} />
          <Pagination
            handler={handleChangePage}
            currentPage={currentPage}
            lastPage={lastPage}
          />
        </div>
      </div>
    </div>
  );
}
