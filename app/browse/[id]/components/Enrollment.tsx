"use client";

import { CourseEnrollmentDetailsType, WeeklyScheduleType } from "../types";
import { useState } from "react";
import { useUser } from "@/provider/UserProvider";
import IncompleteAccountWarning from "./IncompleteAccuntWarning";
import UnauthenticationWarning from "./UnauthenticationWarning";
import EnrolledCourse from "./EnrolledCourse";
import RateCourse from "./RateCourse";
import EnrollmentForm from "./EnrollmentForm";
import useCourseActions from "../hooks/useCourseActions";
import Image from "next/image";
import X from "@/public/X.svg";

interface EnrollNowProps {
  weeklySchedules: WeeklyScheduleType[];
  courseId: number;
  basePrice: number;
  enrollment: CourseEnrollmentDetailsType;
  isCourseRatedData: boolean;
}

export default function Enrollment({
  weeklySchedules,
  courseId,
  basePrice,
  enrollment,
  isCourseRatedData,
}: EnrollNowProps) {
  const { user } = useUser();

  const [enrolledCourse, setEnrolledCourse] =
    useState<CourseEnrollmentDetailsType | null>(enrollment || null);

  const [hideRatingSection, setHideRatingSection] = useState(false);

  const {
    isCourseRated,
    courseRating,
    handleRateCourse,
    retakeEnrollment,
    handleCompleteEnrollment,
  } = useCourseActions({
    courseId,
    enrolledCourse,
    setEnrolledCourse,
    isCourseRatedData,
  });

  return (
    <section className="space-y-8 w-full max-w-132.5">
      {/* ✅ Always visible */}
      {!enrolledCourse && (
        <EnrollmentForm
          weeklySchedules={weeklySchedules}
          basePrice={basePrice}
          courseId={courseId}
          setEnrolledCourse={setEnrolledCourse}
        />
      )}

      {/* ✅ Show enrolled course info */}
      {enrolledCourse && (
        <EnrolledCourse
          handleCompleteEnrollment={handleCompleteEnrollment}
          enrollment={enrolledCourse}
          retakeEnrollment={retakeEnrollment}
        />
      )}

      {/* ✅ Rating BELOW form */}
      {enrolledCourse && !isCourseRated && !hideRatingSection && (
        <div className="bg-white rounded-xl p-2.5 pb-10 flex flex-col items-center gap-4.5 w-full">
          <div className="w-full flex justify-end">
            <Image
              onClick={() => setHideRatingSection(true)}
              className="cursor-pointer"
              src={X}
              alt="close"
            />
          </div>

          <h1 className="font-medium text-dark-gray">Rate your experience</h1>

          <RateCourse
            rating={courseRating}
            handleRateCourse={handleRateCourse}
          />
        </div>
      )}

      {/* ✅ Already rated */}
      {enrolledCourse && isCourseRated && (
        <p className="text-center text-gray-500">
          You&apos;ve already rated this course
        </p>
      )}

      {/* ✅ Warnings */}
      {user && !user.profileComplete && <IncompleteAccountWarning />}

      {!user && <UnauthenticationWarning />}
    </section>
  );
}
