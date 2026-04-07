import api from "@/utils/axios";
import { SelectedOptions } from "../components/Enrollment";
import axios from "axios";
import { EnrollmentType } from "@/shared/types";

export async function getSessionTypes(
  courseId: number,
  scheduleId: number,
  timeSlotId: number,
) {
  try {
    const res = await api.get(
      `/courses/${courseId}/session-types?weekly_schedule_id=${scheduleId}&time_slot_id=${timeSlotId}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getTimeSlots(courseId: number, scheduleId: number) {
  try {
    const res = await api.get(
      `/courses/${courseId}/time-slots?weekly_schedule_id=${scheduleId}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getWeeklySchedules(courseId: number) {
  try {
    const res = await api.get(`/courses/${courseId}/weekly-schedules`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export interface EnrollOnCourseResponse {
  data: EnrollmentType;
  message: string;
}

export async function enrollOnCourse(
  courseId: number,
  selectedOptions: SelectedOptions,
  force: boolean,
): Promise<EnrollOnCourseResponse> {
  try {
    const res = await axios.post<EnrollOnCourseResponse>("/api/enrollments", {
      courseId: courseId,
      courseScheduleId: selectedOptions.courseScheduleId,
      force: force,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function completeEnrollment(enrollmentId: number) {
  try {
    const res = await axios.patch(`/api/enrollments/${enrollmentId}/complete`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function retakeCourse(enrollmentId: number) {
  try {
    const res = await axios.delete(`/api/enrollments/${enrollmentId}/retake`);
    return res.status === 204;
  } catch (error) {
    throw error;
  }
}

export async function rateCourse(courseId: number, rating: number) {
  try {
    const res = await axios.post(`/api/courses/${courseId}/reviews`, {
      rating,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
