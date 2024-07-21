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
}: {
  children: ReactNode;
  type: "link" | "button";
  linkHref: string;
  linkName: string;
}) => {
  return (
    <motion.button
      className="px-12 py-2 bg-inherit hover:bg-inherit hover:bg-red-300  text-2xl bg-red-500"
      whileHover={{ scale: 1.05 }}
    >
      {type === "link" ? <Link href={linkHref}>{linkName}</Link> : children}
    </motion.button>
  );
};

export default ButtonWithMotion;
