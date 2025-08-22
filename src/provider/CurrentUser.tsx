// "use client";

// import { UserType } from "@/type";
// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";

// type userContextType = {
//   user: UserType | null;
// };

// const UserContext = createContext({} as userContextType);

// export default function UserContextProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [user, setUser] = useState<null | UserType>(null);

//   useEffect(() => {
//     const getCurrentUserByAccessToken = async () => {
//       const token = localStorage.getItem("Token:") as string;

//       if (!token) return;
//       try {
//         const response = await axios.get(
//           "http://localhost:4001/profile/current-user",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setUser(response?.data?.user);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getCurrentUserByAccessToken();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
//   );
// }

// export const useUser = () => useContext(UserContext);

"use client";

import { UserType } from "@/type";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUserByAccessToken = async () => {
      const token = localStorage.getItem("Token") as string;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/current-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response?.data?.user);
      } catch (error) {
        console.log("Error fetching user:", error);
        // Optionally remove invalid token
        localStorage.removeItem("Token:");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUserByAccessToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
