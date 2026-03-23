import { createContext, useState } from "react";
import type { ReactNode } from "react";
// إنشاء الـ context مع النوع الافتراضي (هنا any عشان مؤقت)
export const UserContext = createContext<any>({});

interface UserContextProviderProps {
  children: ReactNode;
}

export default function UserContextProvider({ children }: UserContextProviderProps) {
    const [userToken, setUserToken] = useState<string | null>(()=>{
      return localStorage.getItem("userToken");
    });
     const [userId, setUserId] = useState<string | null>(()=>{
      return localStorage.getItem("userId");
     });
      // const [idToken, setIdToken] = useState<string | null>(null);
  return (
    <UserContext.Provider value={{userToken, setUserToken ,userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}