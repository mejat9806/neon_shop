"use client";
import React, { RefObject, useEffect } from "react";
import Cart from "./Cart";
import { useRefContext } from "@/lib/Context";
import { useInView } from "framer-motion";

const Header = () => {
  // const Ref = useRefContext();

  // const isInView = useInView(Ref as RefObject<Element>);
  // useEffect(() => {
  //   console.log("Element is in view: ", isInView);
  // }, [isInView]);
  // console.log(isInView);
  return (
    <nav className="font-silkscreen text-4xl flex justify-between z-50  fixed  w-full mix-blend-difference text-white ">
      <div className="">MENU</div>
      <div>LOGO</div>
      <Cart />
    </nav>
  );
};

export default Header;
