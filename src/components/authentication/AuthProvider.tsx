"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
interface AuthInfo {
  isAuthed: boolean;
  token: string;
}
interface AuthInfoContext {
  isAuthed: boolean;
  token: string;
  setAuthInfo: (authInfo: AuthInfo) => void;
}
export const AuthContext = createContext<AuthInfoContext>({
  isAuthed: false,
  token: "",
  setAuthInfo: () => {},
});
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    isAuthed: false,
    token: "",
  });
  useLayoutEffect(() => {
    setAuthInfo({
      isAuthed: !!localStorage.getItem("token"),
      token: localStorage.getItem("token") || "",
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authInfo, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};

export { AuthProvider, useAuth };