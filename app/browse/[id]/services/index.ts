import api from "@/utils/axios";
import { SelectedOptions } from "../components/EnrollNow";

export async function getCourseDetails(courseId: number) {
  try {
    const res = await api.get(`/courses/${courseId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

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

export async function enrollOnCourse(
  selectedOptions: SelectedOptions,
  force: boolean,
  token: string,
) {
  try {
    const res = await api.post(
      "/enrollments",
      {
        courseId: 1,
        courseScheduleId: selectedOptions.scheduleId,
        force: force,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
