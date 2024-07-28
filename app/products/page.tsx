import { Metadata } from "next";
import React from "react";
import Filter from "../_components/Products/Filter";
import { AllProducts } from "../_components/Products/AllProducts";
import { data } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
};
const page = async () => {
  const products = await fetch("http://localhost:3000/api/products").then(
    (response) => response.json(),
  );
  console.log(products);
  return (
    <div className="flex justify-center  min-h-svh ">
      <div className="grid grid-cols-[0.2fr_1fr] w-full max-w-screen-2xl mx-auto mt-20">
        <Filter />
        <AllProducts data={products} />
      </div>
    </div>
  );
};

export default page;
