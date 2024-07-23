"use client";
import React, { SetStateAction } from "react";

const NavItem = ({
  setIsNavOpen,
}: {
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className=" bg-black  h-svh w-svw absolute overflow-hidden">
      <div className="" onClick={() => setIsNavOpen((open) => !open)}>
        NavItem
      </div>
    </div>
  );
};

export default NavItem;
