"use client";
import React, { SetStateAction } from "react";
import { Button } from "../ui/button";

const NavItem = ({
  setIsNavOpen,
}: {
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className=" bg-black  h-svh w-svw absolute overflow-hidden  p-7">
      <div>
        <div className="flex justify-between ">
          <div
            className="cursor-pointer bg-transparent"
            onClick={() => setIsNavOpen((open) => !open)}
          >
            <h1 className="">Logos</h1>
          </div>
          <Button
            className="text-6xl bg-transparent p-10"
            onClick={() => setIsNavOpen((open) => !open)}
          >
            X
          </Button>
        </div>

        <ul className="text-6xl flex flex-col justify-center items-center mt-32 gap-9 ">
          <li>nav 1</li>
          <li>nav 2</li>
          <li>nav 3</li>
        </ul>
      </div>
    </div>
  );
};

export default NavItem;
