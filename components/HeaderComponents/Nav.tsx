"use client";

import React, { useState } from "react";
import NavItem from "./NavItem";

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
    <nav className=" ">
      {!isNavOPen ? (
        <h1 onClick={() => setIsNavOpen((open) => !open)} className=" ">
          Menu
        </h1>
      ) : (
        <div className="">
          <NavItem setIsNavOpen={setIsNavOpen} />
        </div>
      )}
    </nav>
  );
};
