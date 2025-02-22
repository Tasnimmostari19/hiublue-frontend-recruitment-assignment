"use client";

import { redirect } from "next/navigation";

const CheckAuthentication = () => {
  const token = localStorage.getItem("token");
  if (token) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }
  return null;
};

export default CheckAuthentication;