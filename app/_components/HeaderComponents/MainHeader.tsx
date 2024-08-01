"use client";
import React from "react";
import Header from "./Header";
import { AnimatePresence } from "framer-motion";
import NavItem from "./NavItem";
import CartItem from "./CartItem";
import { useContextStuff } from "@/app/_context/Context";

const MainHeader = () => {
  const { isNavOpen, isCartOpen, setIsNavOpen, setIsCartOpen } =
    useContextStuff();
  console.log(isNavOpen, "navvvvv");
  return (
    <div className="w-svw">
      <Header />
      <AnimatePresence>
        {isNavOpen && <NavItem setIsNavOpen={setIsNavOpen} />}
      </AnimatePresence>
      <AnimatePresence>
        {isCartOpen && (
          <CartItem setIsCartOpen={setIsCartOpen} isNavOpen={isNavOpen} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainHeader;
