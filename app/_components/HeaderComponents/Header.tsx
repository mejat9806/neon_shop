"use client";
import { useState } from "react";
import Cart from "./Cart";
import Logo from "./Logo";
import { Nav } from "./Nav";

const Header = () => {
  const [isNavOPen, setIsNavOpen] = useState(false);
  console.log(isNavOPen);
  return (
    <nav
      className={`font-silkscreen text-4xl flex justify-between fixed top-0 w-full text-balance  bg-transparent  ${
        isNavOPen ? "mix-blend-normal " : "mix-blend-difference p-7"
      } `}
    >
      <div className=" text-white ">
        <Nav setIsNavOpen={setIsNavOpen} isNavOPen={isNavOPen} />
      </div>
      <div className="  text-white  ">
        <Logo />
      </div>
      <div className="text-white ">
        <Cart />
      </div>
    </nav>
  );
};

export default Header;
