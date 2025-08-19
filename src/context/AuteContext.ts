import { createContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {

}
interface User{
id:number;
username:string;
email:string
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: false,
  login: async () => {},
  logout: () => {},
  fetchProfile: async () => {},
});

const getCurrentUserAccessToken = async (accessToken:string) => {
    try{
        const response =await fetch("http://localhost:4001/profile/current-userr",
        {
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        }
        );
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Error fetching user access token:", error);
        return null;
    }
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const getCurrentUser = async () => {
//       const userData = await getCurrentUserByAccessToken(token);
//       if (userData) {
//         setUser(userData);
//       }
//     };

//     getCurrentUser();
//   }, []);

//   useEffect(() => {
//     if (user?.username) {
//       fetchProfile();
//     } else {
//       setProfile(null);
//     }
//   }, [user]);

};
