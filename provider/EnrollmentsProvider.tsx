"use client";

import { Enrollment } from "@/shared/types";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useUser } from "./UserProvider";
import api from "@/utils/axios";

interface EnrollmentsContextType {
  enrollments: Enrollment[];
  setEnrollments: Dispatch<SetStateAction<Enrollment[]>>;
  setError: Dispatch<SetStateAction<string | null>>;
  error: string | null;
}

const EnrollmentsContext = createContext<EnrollmentsContextType | undefined>(
  undefined,
);

export const EnrollmentsProvider = ({ children }: { children: ReactNode }) => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [error, setError] = useState<string | null>(null);

  return (
    <EnrollmentsContext.Provider
      value={{ enrollments, setEnrollments, setError, error }}
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
