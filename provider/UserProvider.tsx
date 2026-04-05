"use client";

import { fetchMe } from "@/shared/services/auth";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

// 1. Define the shape of your user data
export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  fullName: string;
  mobileNumber: string;
  age: number;
  profileComplete: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  console.log("user", user);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await fetchMe();
      setUser(userData.data);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 4. Custom hook to use user context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
