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
  basePrice: string;
  durationWeeks: number;
  isFeatured: boolean;
  avgRating: string;
  reviewCount: number;
  topic: CourseTopicType;
  instructor: InstructorType;
}
