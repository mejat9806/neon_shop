"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useContextStuff } from "@/app/_context/Context";

const AddToCart = () => {
  const { setLocalCart, localCart } = useContextStuff();
  const searchParams = useSearchParams(); //this is for client components to get the search params
  const router = useRouter();
  const pathname = usePathname();
  // console.log(variantData, "sizeArray");
  const params = new URLSearchParams(searchParams);

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

  const color = params.get("color");
  const size = params.get("size");
  console.log(size, "paramsSize");
  function addToLocalCart() {
    const order = { color, size };
    setLocalCart((prev: any) => [...prev, order]);
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
