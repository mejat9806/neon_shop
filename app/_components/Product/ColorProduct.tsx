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
  const sizeArray = variantData.sizes.map((size) => size.size);

  function setURLSearchParams(value: string) {
    const params = new URLSearchParams(searchParams);

    params.set("variant", value);
    router.replace(`${pathname}?${params.toString()}`, {
      //this url is new search params
      scroll: false,
    });
  }
  return (
    <div className="">
      <Button
        className="uppercase"
        onClick={() => setURLSearchParams(variantData._id)}
      >
        {variantData.color}
      </Button>
      {/* <div>
        {sizeArray.map((size) => (
          <Button className="rounded-none gap-1" key={size}>
            {size}
          </Button>
        ))}
      </div> */}
    </div>
  );
};

export default ColorProduct;
