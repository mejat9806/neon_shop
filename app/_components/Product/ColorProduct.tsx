"use client";
import { productDataType, variantType } from "@/app/_types/type";
import React from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface propVariantsType {
  variantData: {
    color: string;
    sizes: variantType[];
    _id: string;
  };
}
const ColorProduct = ({ variantData }: propVariantsType) => {
  console.log(variantData.sizes, "variantData");
  const searchParams = useSearchParams(); //this is for client components to get the search params
  const router = useRouter();
  const pathname = usePathname();
  const sizeArray = variantData.sizes.map((size) => size);
  // console.log(variantData, "sizeArray");
  const params = new URLSearchParams(searchParams);
  const sizeArray = variantData.sizes.map((size) => size);
  // console.log(variantData, "sizeArray");
  const params = new URLSearchParams(searchParams);

  function setURLSearchParams(value: string) {
    params.set("color", value);
    params.delete("size");
    // paramsSize.delete("size");
    router.replace(`${pathname}?${params.toString()}`, {
      //this url is new search params
      scroll: false,
    });
  }
  const currentParams = params.get("color") || "";
  console.log(currentParams, "color");
  const currentParams = params.get("color") || "";
  console.log(currentParams, "color");
  return (
    <div className="">
      <Button
        className={`uppercase rounded-none border-2 border-black  ${
          currentParams === variantData.color
            ? "bg-black text-white"
            : "bg-transparent text-black hover:text-white hover:bg-red-300 "
        }`}
        onClick={() => setURLSearchParams(variantData.color)}
        className={`uppercase rounded-none border-2 border-black  ${
          currentParams === variantData.color
            ? "bg-black text-white"
            : "bg-transparent text-black hover:text-white hover:bg-red-300 "
        }`}
        onClick={() => setURLSearchParams(variantData.color)}
      >
        {variantData.color}
      </Button>
      {/* <div>
        {sizeArray.map((size) => (
          <Button
            className="rounded-none gap-1"
            key={size._id}
            onClick={() => setURLSearchParams(size._id)}
          >
            {size.size}
          <Button
            className="rounded-none gap-1"
            key={size._id}
            onClick={() => setURLSearchParams(size._id)}
          >
            {size.size}
          </Button>
        ))}
      </div> */}
    </div>
  );
};

export default ColorProduct;
