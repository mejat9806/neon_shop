"use client";
import { useInView } from "framer-motion";

import { productDataType } from "@/app/_types/type";
import ProductsList from "../HomePage_Products/ProductsList";
import { useRef } from "react";
import { motion as m } from "framer-motion";
interface dataType {
  data: productDataType[];
  SectionName: string;
}

const ProductShowCase = ({ data, SectionName }: dataType) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  console.log(isInView, "isInView");
  return (
    <m.div
      className={`${
        isInView ? "opacity-100 " : "opacity-0"
      } transition-opacity duration-500 ease-in-out`}
    >
      {" "}
      <div
        className="flex flex-col justify-center items-center mt-10 font-silkscreen text-4xl"
        ref={ref}
      >
        <div className="relative">
          <h1 className="bg-red-500 px-14 py-10 cursor-pointer z-10 relative text-white ">
            {SectionName}
          </h1>
          <div className="w-full bg-black h-full absolute top-5 right-5"></div>
        </div>

        <div className=" flex my-10 justify-center gap-x-10 ">
          {data.map((item) => (
            <ProductsList key={item._id} data={item} />
          ))}
        </div>
      </div>
    </m.div>
  );
};

export default ProductShowCase;
