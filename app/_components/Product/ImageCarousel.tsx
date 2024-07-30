"use client";
import { productDataType } from "@/app/_types/type";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";
interface propProductDataType {
  productData: productDataType;
}
const ImageCarousel = ({ productData }: propProductDataType) => {
  const allImages = productData.image;
  console.log(allImages, "allImage");
  return (
    <div className="flex justify-center items-center">
      <Carousel className="w-[400px]">
        <CarouselContent>
          {allImages.map((image, i) => (
            <CarouselItem
              key={i}
              className="relative w-[100px] h-[300px] flex justify-center items-cente"
            >
              <Image
                src={`/fashion image/${image}`}
                fill
                className="object-contain"
                aspect-square
                alt={image}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {allImages.length > 1 && (
          <CarouselPrevious className="md:flex hidden" />
        )}
        {allImages.length > 1 && <CarouselNext className="md:flex hidden" />}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
