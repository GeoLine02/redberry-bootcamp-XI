"use client";

import Image from "next/image";
import ArrowDownIcon from "@/public/ArrowDown.svg";
import ArrowUpIcon from "@/public/ArrowUp.svg";
import { SessionType, TimeSlotType, WeeklyScheduleType } from "../types";
import WeeklySchedule from "./WeeklySchedule";
import { useEffect, useState } from "react";
import TimeSlotSection from "./TimeSlotSection";
import { enrollOnCourse, getSessionTypes, getTimeSlots } from "../services";
import SesstionTypeSection from "./SesstionTypeSection";
import TotalPriceSection from "./TotalPriceSection";
import { useUser } from "@/provider/UserProvider";
import { useModal } from "@/provider/ModalProvider";
import SignInModal from "@/shared/components/auth/SignInModal";
import IncompleteAccountWarning from "./IncompleteAccountWarning";
import UnauthenticationWarning from "./UnauthenticationWarning";

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
}

export interface SelectedOptions {
  scheduleId: number | null;
  timeSlotId: number | null;
  sessionTypeId: number | null;
}

export default function EnrollNow({
  weeklySchedules,
  courseId,
}: EnrollNowProps) {
  const { user } = useUser();
  const [collapsedSection, setCollapsedSection] = useState<
    "weeklySchedules" | "timeSlots" | "sessionType" | "payment"
  >("weeklySchedules");

  const [timeSlots, setTimeSlots] = useState<TimeSlotType[]>([]);
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [selectedOptions, setSelectedOptons] = useState<SelectedOptions>({
    scheduleId: null,
    sessionTypeId: null,
    timeSlotId: null,
  });
  console.log(selectedOptions);
  const handleChooseWeeklySchedule = (scheduleId: number) => {
    setSelectedOptons((prev) => ({
      ...prev,
      scheduleId,
    }));
    setCollapsedSection("timeSlots");
  };

  const handleChooseTimeSlot = (timeSlotId: number) => {
    setSelectedOptons((prev) => ({
      ...prev,
      timeSlotId,
    }));
    setCollapsedSection("sessionType");
  };

  const hadnleChooseSessionType = (sessionTypeId: number) => {
    setSelectedOptons((prev) => ({
      ...prev,
      sessionTypeId,
    }));
    setCollapsedSection("payment");
  };

  const { openModal } = useModal();

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("1231231");
        openModal(<SignInModal />);
        return;
      }
      const res = await enrollOnCourse(selectedOptions, false, token);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleFetchTimeSLots = async () => {
      try {
        const res = await getTimeSlots(
          courseId,
          selectedOptions.scheduleId as number,
        );
        setTimeSlots(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedOptions.scheduleId) {
      handleFetchTimeSLots();
    }
  }, [courseId, selectedOptions.scheduleId]);

  useEffect(() => {
    const handleFetchSession = async () => {
      try {
        const res = await getSessionTypes(
          courseId,
          selectedOptions.scheduleId as number,
          selectedOptions.timeSlotId as number,
        );
        setSessions(res.data);
        setCollapsedSection("payment");
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedOptions.timeSlotId) {
      handleFetchSession();
    }
  }, [
    courseId,
    selectedOptions.timeSlotId,
    selectedOptions.scheduleId,
    selectedOptions.sessionTypeId,
  ]);

  return (
    <section className="space-y-8 w-full  max-w-132.5">
      <section>
        <EnrollTypeHeader
          isCollapsed={collapsedSection === "weeklySchedules"}
          step={1}
          stepLabel="Select Weekly Schedule"
        />

        <WeeklySchedule
          handleChooseWeeklySchedule={handleChooseWeeklySchedule}
          schedules={weeklySchedules}
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
            sessionPrice={1}
            basePrice={1}
            isLastStep={collapsedSection !== "payment"}
            totalPrice={1}
            handleEnroll={handleEnroll}
          />
        )}
        {!user && <UnauthenticationWarning />}
      </section>
    </section>
  );
}
