"use client";

import React, { useState } from "react";
import NavItem from "./NavItem";
import { motion as m, AnimatePresence } from "framer-motion";

const navItem = [
  {
    name: "shop",
    link: "/shop",
  },
  {
    name: "about",
    link: "/about",
  },
];

export const Nav = ({
  setIsNavOpen,
  isNavOPen,
}: {
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNavOPen: boolean;
}) => {
  return (
    <AnimatePresence>
      <nav className=" ">
        {!isNavOPen ? (
          <h1 onClick={() => setIsNavOpen((open) => !open)} className=" ">
            Menu
          </h1>
        ) : (
          <m.div
            className=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NavItem setIsNavOpen={setIsNavOpen} />
          </m.div>
        )}
      </nav>
    </AnimatePresence>
  );
};
