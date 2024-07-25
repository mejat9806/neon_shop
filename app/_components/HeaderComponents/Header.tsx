"use client";
import { useState } from "react";
import Cart from "./Cart";
import Logo from "./Logo";
import { Nav } from "./Nav";
import { AnimatePresence } from "framer-motion";
import NavItem from "./NavItem";
import CartItem from "./CartItem";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  return (
    <nav
      className={`font-silkscreen text-4xl flex justify-between fixed top-0 w-full text-balance bg-transparent z-50 text-white ${
        pathname === "/" ? "text-white" : "text-black"
      }`}
    >
      <div className="flex justify-between w-svw ">
        <div className="p-7 mix-blend-difference">
          <Nav setIsNavOpen={setIsNavOpen} />
        </div>
        <div className="p-7 mix-blend-difference">
          <Logo />
        </div>
        <div className="p-7 mix-blend-difference">
          <Cart setIsCartOpen={setIsCartOpen} />
        </div>

        <AnimatePresence>
          {isCartOpen && <CartItem setIsCartOpen={setIsCartOpen} />}
        </AnimatePresence>
        <AnimatePresence>
          {isNavOpen && <NavItem setIsNavOpen={setIsNavOpen} />}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Header;
