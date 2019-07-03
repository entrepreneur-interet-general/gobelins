import React from "react";
import { AuthProvider } from "./auth-context";
import { SelectionsProvider } from "./selections-context";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <SelectionsProvider>{children}</SelectionsProvider>
    </AuthProvider>
  );
}

export default AppProviders;
