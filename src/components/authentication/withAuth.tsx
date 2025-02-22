"use client";

import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

const withAuth = (Component: any) => {
  interface WithAuthProps {
    [key: string]: any;
  }

  const AuthenticatedComponent: React.FC<WithAuthProps> = (props) => {
    const pathname = usePathname();
    const router = useRouter();
    console.log("pathname:", pathname);
    const authInfo = useAuth();
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (pathname !== "/login") {
        if (!token) {
          redirect("/login");
        }
      } else {
        if (token && authInfo.isAuthed) {
          router.push("/dashboard");
        }
      }
    }, [authInfo]);

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;