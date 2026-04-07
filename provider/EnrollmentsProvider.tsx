"use client";

import { getInprogressCourses } from "@/app/(home)/services";
import { EnrollmentType } from "@/shared/types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useUser } from "./UserProvider";

interface EnrollmentsContextType {
  enrolledCourses: EnrollmentType[];
  setEnrolledCourses: Dispatch<SetStateAction<EnrollmentType[]>>;
  setError: Dispatch<SetStateAction<string | null>>;
  error: string | null;
}

const EnrollmentsContext = createContext<EnrollmentsContextType | undefined>(
  undefined,
);

export const EnrollmentsProvider = ({ children }: { children: ReactNode }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrollmentType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const handleFetchEnrollments = async () => {
      try {
        const res = await getInprogressCourses();
        console.log(res.data);
        setEnrolledCourses(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      handleFetchEnrollments();
    }
  }, [user]);

  return (
    <EnrollmentsContext.Provider
      value={{ enrolledCourses, setEnrolledCourses, setError, error }}
    >
      {children}
    </EnrollmentsContext.Provider>
  );
};

// Custom hook for easier usage
export const useEnrollments = () => {
  const context = useContext(EnrollmentsContext);
  if (!context)
    throw new Error("useEnrollments must be used inside EnrollmentsProvider");
  return context;
};
