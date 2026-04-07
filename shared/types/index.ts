export interface CourseTopicType {
  id: number;
  name: string;
  icon: string;
}

export interface InstructorType {
  id: number;
  name: string;
  avatar: string;
}

export interface CourseType {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  durationWeeks: number;
  isFeatured: boolean;
  avgRating: number;
  reviewCount: number;
  category: CategoryType;
  topic: CourseTopicType;
  instructor: InstructorType;
}

export interface CoursesWithPagination {
  data: CourseType[];
  meta: PaginationType;
}

export interface CategoryType {
  id: number;
  name: string;
  icon: string;
}

export interface Topic {
  id: number;
  name: string;
  categoryId: number;
}

export interface Instructor {
  id: number;
  name: string;
  avatar: string;
}

export interface WeeklySchedule {
  id: number;
  label: string;
  days: string[];
}

export interface TimeSlot {
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

export interface Schedule {
  weeklySchedule: WeeklySchedule;
  timeSlot: TimeSlot;
  sessionType: SessionType;
  location: string;
}

export interface EnrollmentType {
  id: number;
  quantity: number;
  totalPrice: number;
  progress: number;
  completedAt: string;
  course: CourseType;
  schedule: Schedule;
}

export interface PaginationType {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}
