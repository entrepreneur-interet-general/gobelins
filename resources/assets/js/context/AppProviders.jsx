import React from "react";
import { AuthProvider } from "./auth-context";

function AppProviders({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default AppProviders;
