"use client";

import Image from "next/image";
import ArrowDownIcon from "@/public/ArrowDown.svg";
import ArrowUpIcon from "@/public/ArrowUp.svg";
import {
  CourseEnrollmentDetailsType,
  CourseEnrollmentType,
  SessionType,
  TimeSlotType,
  WeeklyScheduleType,
} from "../types";
import WeeklySchedule from "./WeeklySchedule";
import { useEffect, useState } from "react";
import TimeSlotSection from "./TimeSlotSection";
import {
  completeEnrollment,
  enrollOnCourse,
  getSessionTypes,
  getTimeSlots,
  retakeCourse,
} from "../services";
import SesstionTypeSection from "./SesstionTypeSection";
import TotalPriceSection from "./TotalPriceSection";
import { useUser } from "@/provider/UserProvider";
import { useModal } from "@/provider/ModalProvider";
import SignInModal from "@/shared/components/auth/SignInModal";
import IncompleteAccountWarning from "./IncompleteAccountWarning";
import UnauthenticationWarning from "./UnauthenticationWarning";
import EnrolledCourse from "./EnrolledCourse";

interface EnrollTypeHeaderProps {
  step: number;
  stepLabel: string;
  isCollapsed: boolean;
}

const EnrollTypeHeader = ({
  isCollapsed,
  step,
  stepLabel,
}: EnrollTypeHeaderProps) => {
  return (
    <div className="cursor-pointer flex items-center justify-between">
      <div className="flex items-center gap-2 w-full">
        <div
          className={`${isCollapsed ? "border-dark-puple text-dark-puple" : "border-medium-gray text-medium-gray"} border-2 rounded-full w-7 aspect-square font-medium text-center`}
        >
          {step}
        </div>
        <h1
          className={`${isCollapsed ? "border-dark-puple text-dark-puple" : "border-medium-gray text-medium-gray"} text-2xl font-semibold`}
        >
          {stepLabel}
        </h1>
      </div>
      {isCollapsed ? (
        <Image
          src={ArrowDownIcon}
          alt="arrow down"
          aria-labelledby="dropdown toggler button"
        />
      ) : (
        <Image
          src={ArrowUpIcon}
          alt="arrow up"
          aria-labelledby="dropdown toggler button"
        />
      )}
    </div>
  );
};

interface EnrollNowProps {
  weeklySchedules: WeeklyScheduleType[];
  courseId: number;
  basePrice: number;
  enrollment: CourseEnrollmentDetailsType;
}

export interface SelectedOptions {
  weeklyScheduleId: number | null; // step 1
  courseScheduleId: number | null; // comes from session
  timeSlotId: number | null;
  sessionTypeId: number | null;
}

export default function EnrollNow({
  weeklySchedules,
  courseId,
  basePrice,
  enrollment,
}: EnrollNowProps) {
  const { user } = useUser();
  const [collapsedSection, setCollapsedSection] = useState<
    "weeklySchedules" | "timeSlots" | "sessionType" | "payment"
  >("weeklySchedules");
  const [timeSlots, setTimeSlots] = useState<TimeSlotType[]>([]);
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [selectedOptions, setSelectedOptons] = useState<SelectedOptions>({
    courseScheduleId: null,
    weeklyScheduleId: null,
    sessionTypeId: null,
    timeSlotId: null,
  });
  const [enrolledCourse, setEnrolledCourse] =
    useState<CourseEnrollmentDetailsType | null>(enrollment || null);
  const [priceModifier, setPriceModifier] = useState<number | null>(null);
  const handleChooseWeeklySchedule = (scheduleId: number) => {
    setSelectedOptons((prev) => ({
      ...prev,
      weeklyScheduleId: scheduleId,
    }));
  };

  const handleChooseTimeSlot = (timeSlotId: number) => {
    setSelectedOptons((prev) => ({
      ...prev,
      timeSlotId,
    }));

    setCollapsedSection("sessionType");
  };

  const hadnleChooseSessionType = (sessionId: number) => {
    const selectedSession = sessions.find(
      (session) => session.id === sessionId,
    );

    if (!selectedSession) return;

    setSelectedOptons((prev) => ({
      ...prev,
      sessionTypeId: selectedSession.id,
      courseScheduleId: selectedSession.courseScheduleId,
    }));

    setPriceModifier(selectedSession.priceModifier);
    setCollapsedSection("payment");
  };

  const { openModal } = useModal();

  const handleEnroll = async () => {
    try {
      if (!user) {
        openModal(<SignInModal />);
        return;
      }
      const res = await enrollOnCourse(courseId, selectedOptions, false);
      setEnrolledCourse(res.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  const handleCompleteEnrollment = async () => {
    try {
      if (!enrolledCourse) return;

      const res = await completeEnrollment(enrolledCourse.id);

      setEnrolledCourse(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const retakeEnrollment = async () => {
    if (!enrolledCourse) return; // ⭐ IMPORTANT

    try {
      const res = await retakeCourse(enrolledCourse.id);

      setEnrolledCourse((prev) =>
        prev
          ? {
              ...prev,
              progress: res.data.progress,
            }
          : prev,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!selectedOptions.weeklyScheduleId) return;
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
        setCollapsedSection("payment");
      } catch (err) {
        console.log(err);
      }
    };

    fetchSessions();
  }, [courseId, selectedOptions.weeklyScheduleId, selectedOptions.timeSlotId]);

  const totalPrice = Number(basePrice) + Number(priceModifier);

  return (
    <>
      {enrolledCourse ? (
        <EnrolledCourse
          handleCompleteEnrollment={handleCompleteEnrollment}
          enrollment={enrolledCourse}
          retakeEnrollment={retakeEnrollment}
        />
      ) : (
        <section className="space-y-8 w-full  max-w-132.5">
          <section>
            <EnrollTypeHeader
              isCollapsed={collapsedSection === "weeklySchedules"}
              step={1}
              stepLabel="Select Weekly Schedule"
            />

            <WeeklySchedule
              handleChooseWeeklySchedule={handleChooseWeeklySchedule}
              weeklySchedules={weeklySchedules}
              selectedOptions={selectedOptions}
            />
          </section>
          <section>
            <EnrollTypeHeader
              isCollapsed={collapsedSection === "timeSlots"}
              step={2}
              stepLabel="Time Slot"
            />

            <TimeSlotSection
              handleChooseTimeSlot={handleChooseTimeSlot}
              timeSlots={timeSlots}
              selectedOptions={selectedOptions}
            />
          </section>
          <section>
            <EnrollTypeHeader
              isCollapsed={collapsedSection === "sessionType"}
              step={3}
              stepLabel="Session Type"
            />
            <SesstionTypeSection
              sessions={sessions}
              handleChooseSessionType={hadnleChooseSessionType}
              selectedOptions={selectedOptions}
            />
          </section>
          <section>
            {!user?.profileComplete ? (
              <IncompleteAccountWarning />
            ) : (
              <TotalPriceSection
                sessionPrice={priceModifier}
                basePrice={basePrice}
                totalPrice={totalPrice}
                isLastStep={collapsedSection !== "payment"}
                handleEnroll={handleEnroll}
              />
            )}
            {!user && <UnauthenticationWarning />}
          </section>
        </section>
      )}
    </>
  );
}
