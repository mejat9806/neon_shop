"use client";
import { useContextStuff } from "@/app/_context/Context";
import currencyFormat from "@/lib/currencyFormat";
import { motion as m } from "framer-motion";
import { Dispatch, SetStateAction, Suspense, useEffect, useRef } from "react";
import SpinnerSmall from "../SpinnerSmall";
import { Button } from "../ui/button";
import CartListItem from "./CartListItem";
import { useGetCart } from "@/lib/clientFetching/useGetCart";
import {
  ResultDataType,
  useGetAllCartItem,
} from "@/lib/clientFetching/useGetAllCartItem";
interface CartItem {
  color: string;
  size: string;
  quantity: number;
}
interface Accumulator {
  [key: string]: CartItem; // Index signature for string keys
}
const CartItem = ({
  setIsCartOpen,
  isNavOpen,
}: {
  isNavOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setLocalCart, localCart } = useContextStuff();
  console.log(localCart, "allItemInCarttt");
  const { data } = useGetAllCartItem({ localCart });
  console.log(data, "dasadasdagwwg");
  const calclatedItemsDuplicated = data.reduce<Accumulator>((acc, item) => {
    const key = `${item?.color}-${item?.size}`;
    if (acc[key]) {
      acc[key].quantity += 1; // If item exists, increase the quantity
    } else {
      acc[key] = { ...item, quantity: 1 }; // Otherwise, add the item with quantity 1
    }
    return acc;
  }, {});
  const uniqueCartItems = Object.values(
    calclatedItemsDuplicated,
  ) as ResultDataType[];
  console.log(uniqueCartItems, "uniqueCartItems");
  console.log(data, "stuffff");
  useEffect(() => {
    function handler(e: MouseEvent) {
      const contains = ref.current?.contains(e.target as Node);
      if (ref.current && !contains) {
        // console.log(
        //   { ref: ref.current, eTarget: e.target, contains },
        //   "refffff",
        // );
        //ref.current is the ref element,e.target is where we click ,contains will be check when the modal is open othervise null   //
        // console.log("work", ref.current, e.target);
        setIsCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
  });
  useEffect(() => {
    const getLocalCart = localStorage.getItem("localCart");
    if (getLocalCart) {
      setLocalCart(JSON.parse(getLocalCart));
    }
    console.log(getLocalCart);
  }, [setLocalCart]);
  useEffect(() => {
    localStorage.setItem("localCart", JSON.stringify(localCart));
  }, [localCart]);
  const flattenedCartItems = data.flat();
  console.log(flattenedCartItems, "flat");

  const totalPrice = uniqueCartItems
    .flat()
    .reduce((sum, item) => sum + item?.product?.price * item?.quantity, 0);
  const formatedCurrrency = currencyFormat(totalPrice);

  function addToURlseachParamsForCheckOut() {
    const itemsToCheckout = flattenedCartItems.map((item) => ({
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      product: {
        price: item.product.price,
        productId: item.product._id,
      },
    }));

    localStorage.setItem("cartToCheckout", JSON.stringify(itemsToCheckout));
  }

  return (
    <div
      ref={ref}
      className="absolute bg-transparent font-orbitron right-3 top-6 w-[600px] flex justify-end overflow-hidden "
    >
      <m.div
        className=" text-white   bg-black w-full h-full overflow-hidden  z-50 p-5 origin-top-right"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          duration: 0.1,
          ease: "easeInOut",
          type: "spring",
        }}
      >
        <div className=" border-2 border-red-500  h-full pb-10">
          <div className="flex justify-between items-center p-6 ">
            <h1 className="text-2xl">Cart Item </h1>
            <Button
              className="text-2xl bg-transparent p-4"
              onClick={() => setIsCartOpen((open) => !open)}
            >
              X
            </Button>
          </div>
          <div>
            <Suspense fallback={<SpinnerSmall className="h-full" />}>
              <m.ul className=" flex flex-col gap-9 w-full px-4">
                {uniqueCartItems.map((item, i) => (
                  <CartListItem item={item} key={i} />
                ))}
              </m.ul>
            </Suspense>
            <div className="mt-5 w-full flex justify-between px-4 items-center">
              <h1>
                Total : <span className="font-bold">{formatedCurrrency}</span>
              </h1>
              <Button
                className="w-32 bg-red-500 hover:bg-white hover:text-red-600"
                onClick={() => addToURlseachParamsForCheckOut()}
              >
                Pay
              </Button>
            </div>
          </div>
        </div>
      </m.div>
    </div>
  );
};

export default CartItem;

//fetch the cart data here
