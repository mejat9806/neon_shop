"use client";

import { sizeTye, variantType } from "@/app/_types/type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

const SizeVariant = ({ sizeData }: { sizeData: variantType }) => {
  console.log(sizeData, "sizeData");
  const searchParams = useSearchParams(); //this is for client components to get the search params
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  function setURLSearchParams(value: string) {
    params.set("size", value);
    router.replace(`${pathname}?${params.toString()}`, {
      //this url is new search params
      scroll: false,
    });
  }
  const currentParams = params.get("size") || "s";

  return (
    <Button
      onClick={() => setURLSearchParams(sizeData.size)}
      disabled={!sizeData.quantity}
      className={`uppercase rounded-none border-2 border-black w-10  ${
        currentParams === sizeData.size
          ? "bg-black text-white"
          : "bg-transparent text-black hover:text-white hover:bg-red-300"
      }`}
    >
      {sizeData.size}
    </Button>
  );
};

export default SizeVariant;
