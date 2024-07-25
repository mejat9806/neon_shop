import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface exampleDataType {
  name: string;
  price: number;
  qty: number;
  img: string;
  id: string;
}

const CartListItem = ({ item }: { item: exampleDataType }) => {
  console.log(item.id, "imageExample");
  return (
    <li>
      <div className="flex items-center">
        <div className="relative w-16 h-16 p-10">
          <Link href={`/products/${item.id}`}>
            <Image
              src={item.img}
              layout="fill" // Ensures image fills the container
              objectFit="cover" // Adjusts how the image fits within the container
              alt={item.name}
            />
          </Link>
        </div>
        <div className="ml-4 flex-col h-full w-full flex-1">
          <h1 className="text-lg font-semibold">{item.name}</h1>
          <p className="text-sm text-gray-500">${item.price}</p>
          <p className="text-sm text-gray-500">Qty: {item.qty}</p>
        </div>
        <Button className="text-base border-2 border-red-600 text-red-600 hover:bg-white ">
          Remove
        </Button>
      </div>
    </li>
  );
};

export default CartListItem;
