import { useState } from "react";
import { completeEnrollment, rateCourse, retakeCourse } from "../services";
import { CourseEnrollmentDetailsType } from "../types";
import { useModal } from "@/provider/ModalProvider";
import CompleteCourseModal from "../components/CompleteCourseModal";
import { useEnrollments } from "@/provider/EnrollmentsProvider";

interface UseCourseActionsParams {
  courseId: number;
  enrolledCourse: CourseEnrollmentDetailsType | null;
  setEnrolledCourse: (course: CourseEnrollmentDetailsType | null) => void;
  isCourseRatedData: boolean;
}

export default function useCourseActions({
  courseId,
  enrolledCourse,
  setEnrolledCourse,
  isCourseRatedData,
}: UseCourseActionsParams) {
  const [isCourseRated, setIsCourseRated] = useState(isCourseRatedData);
  const [courseRating, setCourseRating] = useState(0);
  const { setEnrolledCourses } = useEnrollments();
  const { openModal } = useModal();

  const retakeEnrollment = async () => {
    if (!enrolledCourse) return;
    try {
      const res = await retakeCourse(enrolledCourse.id);
      if (res) setEnrolledCourse(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const handleRateCourse = async (rating: number) => {
    try {
      const res = await rateCourse(courseId, rating);
      if (res.data) {
        setCourseRating(res.data.rating);
        setIsCourseRated(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const handleCompleteEnrollment = async () => {
    if (!enrolledCourse) return;
    try {
      const res = await completeEnrollment(enrolledCourse.id);
      setEnrolledCourse(res.data);
      setEnrolledCourses((prev) =>
        prev.filter((enrollment) => enrollment.id !== enrolledCourse.id),
      );
      openModal(
        <CompleteCourseModal
          isCourseRated={isCourseRated}
          rating={courseRating}
          handleRateCourse={handleRateCourse}
          courseTitle={enrolledCourse.course.title}
        />,
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isCourseRated,
    courseRating,
    handleRateCourse,
    retakeEnrollment,
    handleCompleteEnrollment,
  };
}
