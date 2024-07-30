"use client";
import { productDataType } from "@/app/_types/type";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface propProductDataType {
  productData: productDataType;
}

const ImageView = ({ productData }: propProductDataType) => {
  console.log(productData.image, "productdataImage");
  const allImages = productData.image;
  // flatMap is used to get nested arrays
  const [index, setIndex] = useState(0);
  console.log(allImages.length, index, "length");
  const increaseIndex = () => {
    setIndex((index) => (index === allImages.length - 1 ? 0 : index + 1));
  };
  const decreaseIndex = () => {
    setIndex((index) => (index === allImages.length - 1 ? 0 : index + 1));
  };
  return (
    <div className="justify-center w-full items-center  flex flex-col">
      <div className=" relative  flex  ">
        <div className="flex flex-col justify-center items-center">
          <button
            className=" top-1/2 left-4 hover:bg-black hover:text-white  rounded-full opacity-50 transition-all duration-150 w-6 h-6 "
            onClick={() => decreaseIndex()}
          >
            <FaArrowLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="relative lg:w-[500px] lg:h-[500px] w-80 h-80">
          <Image
            src={`/fashion image/${allImages[index]}`}
            fill
            aspect-square="true"
            alt={allImages[0]}
          />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <button
            className=" hover:bg-black hover:text-white  rounded-full opacity-50 transition-all duration-150 w-6 h-6  flex "
            onClick={() => increaseIndex()}
          >
            <FaArrowRight className="w-6 h-6 " />
          </button>
        </div>
      </div>
      <div className="flex w-[500px] gap-2 mt-7 justify-center items-center">
        {allImages.map((image, i) => (
          <div
            className={`h-12 w-12 relative ${
              index === i ? "border-2 border-black/25 " : ""
            }`}
            key={i}
            onClick={() => setIndex(i)}
          >
            <Image
              src={`/fashion image/${image}`}
              alt={image}
              fill
              aspect-square="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
