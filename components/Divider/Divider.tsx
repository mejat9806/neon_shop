"use client";
import { useEffect, useRef, useState } from "react";
import ArrowSvg from "./ArrowSvg";
import { motion as m, useScroll } from "framer-motion";

const Divider = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    function getWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", getWidth);
    getWidth();
    return () => {
      window.removeEventListener("resize", getWidth);
    };
  }, []);

  const widthLimit = Math.floor(width / 10);
  const numArrow = Array.from(Array(widthLimit));

  return (
    <div className="flex overflow-hidden ">
      {numArrow.map((x, i) => (
        <div key={i} className="animate-infinite-scroll-normal ">
          <ArrowSvg />
        </div>
      ))}
    </div>
  );
};

export default Divider;
