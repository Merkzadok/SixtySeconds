"use client";

import { UserType } from "@/type";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type userContextType = {
  user: UserType | null;
};

const UserContext = createContext({} as userContextType);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<null | UserType>(null);

  useEffect(() => {
    const getCurrentUserByAccessToken = async () => {
      const token = localStorage.getItem("Token:") as string;

      if (!token) return;
      try {
        const response = await axios.get(
          "http://localhost:4001/profile/current-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response?.data?.user);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUserByAccessToken();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
