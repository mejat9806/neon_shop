import { productDataType } from "@/app/_types/type";
import React from "react";
import AllProductsITem from "./AllProductsITem";
import ProductsList from "../HomePage_Products/ProductsList";
interface allProductListType {
  data: productDataType[];
}

export const AllProducts = ({ data }: allProductListType) => {
  return (
    <div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
        {data.map((product) => (
          <ProductsList data={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};
