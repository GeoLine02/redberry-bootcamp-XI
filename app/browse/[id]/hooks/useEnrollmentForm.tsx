"use client";

import { useState, useEffect } from "react";
import { getSessionTypes, getTimeSlots } from "../services";
import {
  SelectedEnrollmentOptionsType,
  SessionType,
  TimeSlotType,
} from "../types";

export default function useEnrollmentForm(courseId: number, basePrice: number) {
  const [collapsedSection, setCollapsedSection] = useState<
    | "weeklySchedules"
    | "timeSlots"
    | "sessionType"
    | "weeklySchedules"
    | "payment"
  >("weeklySchedules");
  const [priceModifier, setPriceModifier] = useState<number | null>(null);
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlotType[]>([]);
  const [selectedOptions, setSelectedOptions] =
    useState<SelectedEnrollmentOptionsType>({
      courseScheduleId: null,
      weeklyScheduleId: null,
      sessionTypeId: null,
      timeSlotId: null,
    });

  const handleChooseWeeklySchedule = (scheduleId: number) => {
    setSelectedOptions((prev) => ({ ...prev, weeklyScheduleId: scheduleId }));
    setCollapsedSection("timeSlots");
  };

  const handleChooseTimeSlot = (timeSlotId: number) => {
    setSelectedOptions((prev) => ({ ...prev, timeSlotId }));
    setCollapsedSection("sessionType");
  };

  const handleChooseSessionType = (sessionId: number) => {
    const selectedSession = sessions.find(
      (session) => session.id === sessionId,
    );
    if (!selectedSession) return;

    setSelectedOptions((prev) => ({
      ...prev,
      sessionTypeId: selectedSession.id,
      courseScheduleId: selectedSession.courseScheduleId,
    }));
    setPriceModifier(selectedSession.priceModifier);
    setCollapsedSection("payment");
  };

  const resetForm = () => {
    setSelectedOptions({
      courseScheduleId: null,
      sessionTypeId: null,
      timeSlotId: null,
      weeklyScheduleId: null,
    });
    setCollapsedSection("weeklySchedules");
  };

  useEffect(() => {
    if (!selectedOptions.weeklyScheduleId) return;

    const fetchTimeSlots = async () => {
      try {
        const res = await getTimeSlots(
          courseId,
          selectedOptions.weeklyScheduleId!,
        );
        setTimeSlots(res.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err.response.data);
      }
    };

    fetchTimeSlots();
  }, [courseId, selectedOptions.weeklyScheduleId]);

  useEffect(() => {
    if (!selectedOptions.timeSlotId) return;

    const fetchSessions = async () => {
      try {
        const res = await getSessionTypes(
          courseId,
          selectedOptions.weeklyScheduleId as number,
          selectedOptions.timeSlotId as number,
        );
        setSessions(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSessions();
  }, [courseId, selectedOptions.weeklyScheduleId, selectedOptions.timeSlotId]);

  const totalPrice = Number(basePrice) + Number(priceModifier);

  return {
    collapsedSection,
    sessions,
    timeSlots,
    selectedOptions,
    priceModifier,
    totalPrice,
    handleChooseWeeklySchedule,
    handleChooseTimeSlot,
    handleChooseSessionType,
    resetForm,
  };
}
