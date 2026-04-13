// components/CourseDetailsClient.tsx
"use client";

import { useEffect, useState } from "react";
import CourseStats from "./CourseStats";
import Enrollment from "./Enrollment";
import {
  CourseCategoryType,
  CourseDetailsType,
  CourseEnrollmentDetailsType,
  ReviewType,
  WeeklyScheduleType,
} from "../types";

interface CourseDetailsClientProps {
  // CourseStats props
  courseDetails: CourseDetailsType;
  title: string;
  durationWeeks: number;
  category: CourseCategoryType;
  description: string;
  image: string;
  lecturerImage: string;
  lecturerName: string;
  // Enrollment props
  weeklySchedules: WeeklyScheduleType[];
  courseId: number;
  basePrice: number;
  enrollment: CourseEnrollmentDetailsType;
  isCourseRatedData: boolean;
  reviews: ReviewType[];
}

export default function CourseDetailsClient({
  weeklySchedules,
  courseId,
  basePrice,
  enrollment,
  courseDetails,
  isCourseRatedData,
  reviews,
}: CourseDetailsClientProps) {
  const [rating, setRating] = useState<ReviewType[]>(reviews);
  const [isCourseRated, setIsCourseRated] = useState(isCourseRatedData);
  const [courseDetailsState, setCourseDetailsState] =
    useState<CourseDetailsType>(courseDetails);
  const onRatingUpdate = (rating: number) => {
    setRating((prevRatings) => [
      ...prevRatings,
      {
        userId: Infinity,
        rating: rating,
      },
    ]);
    setIsCourseRated(true);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsCourseRated(isCourseRatedData);
    setCourseDetailsState(courseDetails);
    setRating(reviews);
  }, [isCourseRatedData, courseDetails, reviews]);

  return (
    <div className="flex gap-33.25">
      <CourseStats
        {...courseDetailsState}
        lecturerImage={courseDetailsState.instructor.avatar}
        lecturerName={courseDetailsState.instructor.name}
        rating={rating}
      />
      <Enrollment
        weeklySchedules={weeklySchedules}
        courseId={courseId}
        basePrice={basePrice}
        enrollment={enrollment}
        isCourseRated={isCourseRated}
        onRatingUpdate={onRatingUpdate}
        reviews={rating}
      />
    </div>
  );
}
