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
  onRatingUpdate: (rating: number) => void;
  isCourseRated: boolean;
}

export default function useCourseActions({
  courseId,
  enrolledCourse,
  setEnrolledCourse,
  onRatingUpdate,
  isCourseRated,
}: UseCourseActionsParams) {
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

      if (res.data && enrolledCourse) {
        const oldAvg = enrolledCourse.course.avgRating;
        const count = enrolledCourse.course.reviewCount;
        const oldUserRating = courseRating;

        let newAvg = oldAvg;
        let newCount = count;

        if (oldUserRating) {
          // ✅ updating existing rating
          newAvg = (oldAvg * count - oldUserRating + rating) / count;
        } else {
          // ✅ first time rating
          newAvg = (oldAvg * count + rating) / (count + 1);
          newCount = count + 1;
        }

        // ✅ update enrolled course state
        setEnrolledCourse({
          ...enrolledCourse,
          course: {
            ...enrolledCourse.course,
            avgRating: Number(newAvg.toFixed(1)),
            reviewCount: newCount,
          },
        });

        onRatingUpdate(rating);
        setCourseRating(rating);
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
    courseRating,
    handleRateCourse,
    retakeEnrollment,
    handleCompleteEnrollment,
  };
}
