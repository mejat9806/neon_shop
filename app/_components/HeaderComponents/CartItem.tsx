"use client";
import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
} from "react";
import { Button } from "../ui/button";
import { AnimatePresence, motion as m } from "framer-motion";
import CartListItem from "./CartListItem";
import Spinner from "../Spinner";
import SpinnerSmall from "../SpinnerSmall";
import currencyFormat from "@/lib/currencyFormat";

const CartItem = ({
  setIsCartOpen,
  isNavOpen,
}: {
  isNavOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const item = [
    {
      name: "Green Shirt ",
      price: 100,
      qty: 1,
      img: "/fashion image/buttonupshortslevecleanupgreen.png",
      id: "66a20cd16d64c881b007969c",
    },

    {
      name: "Pink Shirt",
      price: 1000,
      qty: 10,
      img: "/fashion image/buttonupshortslevecleanuppink.png",
      id: "66a20d106d64c881b00796a3",
    },
  ];
  const ref = useRef<HTMLDivElement>(null);

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

  const totalPrice = item.reduce((sum, item) => sum + item.price, 0);
  const formatedCurrrency = currencyFormat(totalPrice);
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
                {item.map((item) => (
                  <CartListItem item={item} key={item.name} />
                ))}
              </m.ul>
            </Suspense>
            <div className="mt-5 w-full flex justify-between px-4 items-center">
              <h1>
                Total : <span className="font-bold">{formatedCurrrency}</span>
              </h1>
              <Button className="w-32 bg-red-500 hover:bg-white hover:text-red-600">
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
