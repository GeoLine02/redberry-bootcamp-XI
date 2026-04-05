import { SortValueType } from "../services";

export interface SortType {
  value: SortValueType;
  label: string;
}

export interface CategoryFilterType {
  id: number;
  name: string;
  icon: string;
}

export interface TopicFilterType {
  id: number;
  name: string;
  categoryId: number;
}

export interface InstructorFIlterType {
  id: number;
  name: string;
  avatar: string;
}
