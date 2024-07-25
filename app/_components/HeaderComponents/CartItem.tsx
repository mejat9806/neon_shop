import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { AnimatePresence, motion as m } from "framer-motion";
import CartListItem from "./CartListItem";

const CartItem = ({
  setIsCartOpen,
}: {
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const item = [
    {
      name: "item 1",
      price: 100,
      qty: 1,
      img: "/fashion image/buttonupshortslevecleanupgreen.png",
      id: "66a20cd16d64c881b007969c",
    },

    {
      name: "item 3",
      price: 1000,
      qty: 10,
      img: "/fashion image/buttonupshortslevecleanuppink.png",
      id: "66a20d106d64c881b00796a3",
    },
  ];
  return (
    <div className="absolute  right-8  top-8 w-full flex justify-end">
      <m.div
        className=" text-white   bg-black w-1/4 overflow-hidden h-[20em] z-50  origin-top-right"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
      >
        <div className=" border-2 border-red-500 m-5 h-[19em]">
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
            <m.ul className=" flex flex-col gap-9 w-full px-4">
              {item.map((item) => (
                <CartListItem item={item} key={item.name} />
              ))}
            </m.ul>
          </div>
        </div>
      </m.div>
    </div>
  );
};

export default CartItem;
