import { useQueries } from "@tanstack/react-query";
import { Result } from "postcss";
import React from "react";
import { getCartItem } from "./getCartItem";

interface localCartType {
  color: string;
  size: string;
}
export interface ResultDataType {
  uuid: number;
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  color: string;
  size: string;
  quantity: number;
  image: string;
  id: string;
  qty: number;
}
export const useGetAllCartItem = ({
  localCart,
}: {
  localCart: localCartType[];
}) => {
  const result = useQueries({
    queries: localCart.map((data) => ({
      queryKey: ["cartItem", data.color, data.size],
      queryFn: () => getCartItem({ color: data.color, size: data.size }),
    })),
  });
  const data = result.map((data) => data.data).flat() as ResultDataType[];
  return { data };
};
