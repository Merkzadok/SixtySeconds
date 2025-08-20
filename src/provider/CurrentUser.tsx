"use client";

import { UserType } from "@/type";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type userContextType = {
  userProvider: UserType;
};

export const UserContext = createContext({} as userContextType);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userProvider, setUserProvider] = useState({} as UserType);

  const getCurrentUserByAccessToken = async () => {
    const token = localStorage.getItem("token") as string;

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

      setUserProvider(response?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUserByAccessToken();
  }, []);

  return (
    <UserContext.Provider value={{ userProvider }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
