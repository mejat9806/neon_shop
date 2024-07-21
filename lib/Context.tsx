"use client";

import { createContext, ReactNode, useContext, useRef } from "react";

const refContext = createContext<React.RefObject<any> | null>(null);

const RefContextProvider = ({ children }: { children: ReactNode }) => {
  const Ref = useRef<any>(null);
  return <refContext.Provider value={Ref}>{children}</refContext.Provider>;
};

const useRefContext = () => {
  const ref = useContext(refContext);
  if (ref === undefined) {
    throw new Error("context error");
  }
  return ref;
};

export { RefContextProvider, useRefContext };
