"use client";

import React from "react";

export const Nav = ({
  setIsNavOpen,
}: {
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <nav className="">
      <h1
        key={"menuClose"}
        onClick={() => setIsNavOpen((open) => !open)}
        className="cursor-pointer "
      >
        Menu
      </h1>

      {/* <AnimatePresence>
        {isNavOPen && (
          <m.div key={"menuOpen"}>
            <NavItem setIsNavOpen={setIsNavOpen} />
          </m.div>
        )}
      </AnimatePresence> */}
    </nav>
  );
};
