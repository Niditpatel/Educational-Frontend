import { createContext, useState } from "react";

export interface LogUserDetail {
  email: String;
  firstName: String;
  lastName: String;
  title: String;
  role: Number;
  institute: String;
}

export const contextLogUser = createContext<LogUserDetail | null>(null);
export const LogUserContextProvider = contextLogUser.Provider;
export const LogUserContextConsumer = contextLogUser.Consumer;
