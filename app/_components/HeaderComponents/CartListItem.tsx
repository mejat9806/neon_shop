"use client";
import { ResultDataType } from "@/lib/clientFetching/useGetAllCartItem";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useContextStuff } from "@/app/_context/Context";

const CartListItem = ({ item, uniqueCartItems }: { item: ResultDataType }) => {
  const { setLocalCart, localCart } = useContextStuff();

  function deleteItemFromCart(itemToRemove: ResultDataType) {
    const currentCart = uniqueCartItems;

    const updatedCart = currentCart
      .map((item: { uuid: number; qty: number }) => {
        if (item.uuid === itemToRemove.uuid) {
          const updatedQuantity = item.qty - 1;
          if (updatedQuantity <= 0) {
            return null;
          }
          return { ...item, qty: updatedQuantity };
        }
        return item;
      })
      .filter((item: null) => item !== null);

    setLocalCart(updatedCart);
    localStorage.setItem("localCart", JSON.stringify(updatedCart));
  }

  return (
    <li>
      <div className="flex items-center">
        <div className="relative w-16 h-16 p-10">
          <Link href={`/fashion image/${item?._id}`}>
            <Image
              src={`/fashion image/${item?.image}`}
              layout="fill"
              objectFit="cover"
              alt={item?.product?.name}
            />
          </Link>
        </div>
        <div className="ml-4 flex-col h-full w-full flex-1">
          <h1 className="text-lg font-semibold">{item?.product?.name}</h1>
          <p className="text-sm text-gray-500">${item?.product?.price}</p>
          <p className="text-sm text-gray-500">Qty: {item?.qty}</p>
        </div>
        <Button
          className="text-base border-2 border-red-600 text-red-600 hover:bg-white"
          onClick={() => deleteItemFromCart(item)}
        >
          Remove
        </Button>
      </div>
    </li>
  );
};

export default CartListItem;
