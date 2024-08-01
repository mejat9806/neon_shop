"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useContextStuff } from "@/app/_context/Context";
import { useGetCart } from "@/lib/clientFetching/useGetCart";
import { v4 as uuidv4 } from "uuid";
import { variantType } from "@/app/_types/type";

const AddToCart = ({ colorVariants }: { colorVariants: variantType[] }) => {
  const { setLocalCart, localCart } = useContextStuff();
  const searchParams = useSearchParams(); //this is for client components to get the search params
  const router = useRouter();
  const pathname = usePathname();
  // console.log(variantData, "sizeArray");
  const params = new URLSearchParams(searchParams);
  const color = params.get("color");
  const size = params.get("size");
  let data: any;
  let isLoading;

  const result = useGetCart({ color, size });
  data = result.data;
  isLoading = result.isLoading;
  console.log({ colorVariants, data }, "check the different");
  console.log({ data }, "useQueryData");
  //this is for initialization of the localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("localCart");
    //this will get the the current localCart if it exists set it into the state
    if (storedCart) {
      setLocalCart(JSON.parse(storedCart));
    }
  }, []);

  //this is just to add item to localStorage
  useEffect(() => {
    localStorage.setItem("localCart", JSON.stringify(localCart));
  }, [localCart]);

  function addToLocalCart() {
    const itemWithData = { ...data[0], uuid: uuidv4() };
    console.log(itemWithData, "Item with data");

    setLocalCart((prev: any) => [...prev, itemWithData]);
  }
  return (
    <Button
      disabled={!color || !size}
      className="disabled:bg-red-700"
      onClick={() => addToLocalCart()}
    >
      AddToCart
    </Button>
  );
};

export default AddToCart;
