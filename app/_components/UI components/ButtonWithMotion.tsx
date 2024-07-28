"use client";
import React, { ReactElement, ReactNode } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const ButtonWithMotion = ({
  children,
  linkName,
  type,
  linkHref,
  className,
}: {
  children: ReactNode;
  type: "link" | "button";
  linkHref: string;
  linkName: string;
  className: string;
}) => {
  return (
    <button
      className={`px-12 py-2 bg-inherit hover:bg-inherit hover:bg-red-300 cursor-pointer text-2xl bg-red-500 z-50 ${className}`}
    >
      {type === "link" ? (
        <Link href={linkHref} className="">
          {linkName}
        </Link>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonWithMotion;
