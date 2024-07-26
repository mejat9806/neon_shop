"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

interface contextType {
  ref: React.RefObject<HTMLElement>;
  isNavOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  isCartOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}
const ContextStuff = createContext<any | null>(null);

const ContextStuffProvider = ({ children }: { children: ReactNode }) => {
  const Ref = useRef<HTMLDivElement>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ContextStuff.Provider
      value={{ Ref, isNavOpen, setIsCartOpen, isCartOpen, setIsNavOpen }}
    >
      {children}
    </ContextStuff.Provider>
  );
};

const useContextStuff = () => {
  const ref = useContext(ContextStuff);

  if (ref === undefined) {
    throw new Error("context error");
  }
  return ref;
};

export { ContextStuffProvider, useContextStuff };
