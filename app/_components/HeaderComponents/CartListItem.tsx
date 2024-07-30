"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useGetCart } from "@/lib/clientFetching/useGetCart";
import { useContextStuff } from "@/app/_context/Context";
import { ResultDataType } from "@/lib/clientFetching/useGetAllCartItem";

const CartListItem = ({ item }: { item: ResultDataType }) => {
  const { allCartItem, setAllCartItem } = useContextStuff();
  console.log(item, "item with size and color");
  if (!item) {
    return <div>Loading</div>;
  }
  console.log(item, "item");
  return (
    <li>
      <div className="flex items-center">
        <div className="relative w-16 h-16 p-10">
          <Link href={`/fashion image/${item?._id}`}>
            <Image
              src={`/fashion image/${item?.image}`}
              layout="fill" // Ensures image fills the container
              objectFit="cover" // Adjusts how the image fits within the container
              alt={item?.product?.name}
            />
          </Link>
        </div>
        <div className="ml-4 flex-col h-full w-full flex-1">
          <h1 className="text-lg font-semibold">{item?.product?.name}</h1>
          <p className="text-sm text-gray-500">${item?.product?.price}</p>
          <p className="text-sm text-gray-500">Qty: {item?.quantity}</p>
        </div>
        <Button className="text-base border-2 border-red-600 text-red-600 hover:bg-white ">
          Remove
        </Button>
      </div>
    </li>
  );
};

export default CartListItem;
