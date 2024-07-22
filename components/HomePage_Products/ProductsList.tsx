"use client";
import { productDataType } from "@/app/_types/type";
import Image from "next/image";
import { motion as m } from "framer-motion";
interface dataType {
  data: productDataType;
}

const ProductsList = ({ data }: dataType) => {
  return (
    <m.div
      className="relative w-52 h-52 "
      initial={{ scale: 1, x: 0 }}
      whileHover={{
        scale: 1.2,
        x: [0, -2, 2, 0],
      }}
    >
      <Image
        src={data.image}
        fill
        className="hover:saturate-200	hover:drop-shadow-3xl dropsha"
        alt={data.name}
      />
    </m.div>
  );
};

export default ProductsList;
