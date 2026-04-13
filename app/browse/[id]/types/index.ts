import { CourseTopicType, CourseType } from "@/shared/types";

interface CourseReviewType {
  userId: number;
  rating: number;
}

export interface CourseCategoryType {
  id: number;
  name: string;
  icon: string;
}

interface CourseInstructorType {
  id: number;
  name: string;
  avatar: string;
}

export interface CourseEnrollmentType {
  id: number;
  quantity: number;
  totalPrice: number;
  progress: number;
  completedAt: Date;
  course: Omit<CourseType, "topic, instructor"> & {
    category: CourseCategoryType;
  };
}

export interface CourseDetailsType {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  durationWeeks: number;
  isFeatured: boolean;
  reviews: CourseReviewType[];
  isRated: boolean;
  category: CourseCategoryType;
  topic: CourseTopicType;
  instructor: CourseInstructorType;
}

export interface WeeklyScheduleType {
  id: number;
  label: string;
  days: string[];
}

export interface TimeSlotType {
  id: number;
  label: string;
  startTime: string;
  endTime: string;
}

export interface SessionType {
  id: number;
  courseScheduleId: number;
  name: string;
  priceModifier: number;
  availableSeats: number;
  location: string;
}

export interface ReviewType {
  userId: number;
  rating: number;
}

export interface CourseDetailsType {
  id: number;
  title: string;
  description: string;
  enrollement: CourseEnrollmentDetailsType | null;
  image: string;
  basePrice: number;
  durationWeeks: number;
  isRated: boolean;
  category: CourseCategoryType;
  topic: CourseTopicType;
  instructor: CourseInstructorType;
  reviews: ReviewType[];
}

export interface CourseEnrollmentDetailsType {
  id: number;
  quantity: number;
  totalPrice: number;
  progress: number;
  completedAt: string; // API returns ISO string
  course: CourseType & {
    category: CourseCategoryType;
    topic: CourseTopicType;
    avgRating: number;
    reviewCount: number;
    instructor: CourseInstructorType;
  };
  schedule: {
    weeklySchedule: WeeklyScheduleType;
    timeSlot: TimeSlotType;
    sessionType: SessionType;
  };
}

export interface EnrollmentConflictType {
  requestedCourseId: number;
  conflictingEnrollmentId: number;
  conflictingCourseName: string;
  schedule: string;
}

export interface SelectedEnrollmentOptionsType {
  courseScheduleId: number | null;
  weeklyScheduleId: number | null;
  sessionTypeId: number | null;
  timeSlotId: number | null;
}
