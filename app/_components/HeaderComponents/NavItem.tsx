"use client";
import React from "react";
import { Button } from "../ui/button";
import { AnimatePresence, motion as m } from "framer-motion";
import { useRouter } from "next/navigation";

const NavItem = ({
  setIsNavOpen,
}: {
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  return (
    <m.div
      className="fixed text-white h-svh  w-svw overflow-hidden p-7 z-50 origin-top font-silkscreen text-4xl"
      initial={{ translateY: "-100vh", backgroundColor: "black" }}
      animate={{ translateY: "0" }}
      exit={{ translateY: "-100vh" }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <div className="flex justify-between">
          <div
            className="cursor-pointer bg-transparent"
            onClick={() => setIsNavOpen((open) => !open)}
          >
            <h1 className="" onClick={() => router.push("/")}>
              Logos
            </h1>
          </div>
          <Button
            className="text-6xl bg-transparent p-10"
            onClick={() => setIsNavOpen((open) => !open)}
          >
            X
          </Button>
        </div>

        <m.ul
          className="text-6xl flex flex-col justify-center items-center mt-32 gap-9"
          initial={{ translateY: "-100vh" }}
          animate={{ translateY: 0 }}
          exit={{ translateY: "-100vh" }}
          transition={{ duration: 0.3 }}
        >
          <li>nav 1</li>
          <li>nav 2</li>
          <li>nav 3</li>
        </m.ul>
      </div>
    </m.div>
  );
};

export default NavItem;
