"use client";
import { useState } from "react";
import CartTitle from "./CartTitle";
import Logo from "./Logo";
import { Nav } from "./Nav";
import { AnimatePresence } from "framer-motion";
import NavItem from "./NavItem";
import CartItem from "./CartItem";
import { usePathname } from "next/navigation";
import { useContextStuff } from "@/app/_context/Context";

const Header = () => {
  // const [isNavOpen, setIsNavOpen] = useState(false);
  const { isNavOpen, isCartOpen, setIsNavOpen, setIsCartOpen } =
    useContextStuff();
  // const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  return (
    <nav
      className={`font-silkscreen text-4xl flex justify-between fixed top-0  text-balance  z-50 text-white  mix-blend-difference ${
        pathname === "/" ? "text-white" : "text-black"
      }`}
    >
      <div className="flex justify-between w-svw ">
        <div className="p-7 ">
          {" "}
          <Nav setIsNavOpen={setIsNavOpen} />
        </div>
        <div className="p-7 ">
          <Logo />
        </div>
        <div className="p-7 ">
          <CartTitle setIsCartOpen={setIsCartOpen} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
