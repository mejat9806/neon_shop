"use client";
import { productDataType } from "@/app/_types/type";
import Image from "next/image";
import { motion as m } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import currencyFormat from "@/lib/currencyFormat";
interface dataType {
  data: productDataType;
}

const ProductsList = ({ data }: dataType) => {
  const pathname = usePathname();
  const router = useRouter();
  console.log(data, "imageForFrontPage");
  return (
    <div className="flex justify-center items-center flex-col gap-10">
      <m.div
        className=" md:w-[400px] md:h-[400px] relative w-[300px] h-[300px] font-silkscreen"
        initial={{ scale: 1, x: 0 }}
        whileHover={{
          scale: 1.05,
          x: [0, -2, 2, 0],
        }}
      >
        <Image
          src={data.mainImage}
          fill
          className="hover:saturate-200	hover:drop-shadow-3xl object-contain  "
          alt={data.name}
          onClick={() => router.push(`/products/${data._id}`)}
        />
      </m.div>
      <div>
        {pathname === "/products" ? (
          <div className="font-silkscreen flex justify-center items-center flex-col ">
            <h1 className="text-lg font-semibold">{data.name}</h1>
            <h1>{currencyFormat(data.price)}</h1>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductsList;
