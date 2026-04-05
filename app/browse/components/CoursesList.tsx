"use client";

import CourseCard from "@/shared/components/CourseCard";
import { CourseType } from "@/shared/types";

interface CoursesListProps {
  courses: CourseType[];
}

export default function CoursesList({ courses }: CoursesListProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full grid grid-cols-3 gap-6 flex-1">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            category={course.category}
            imageSrc={course.image}
            lecturer={course.instructor}
            price={course.basePrice}
            rating={course.avgRating}
            title={course.title}
            weeks={course.durationWeeks}
          />
        ))}
      </div>
    </div>
  );
}
