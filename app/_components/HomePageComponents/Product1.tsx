import { productDataType } from "@/app/_types/type";
import ProductsList from "../HomePage_Products/ProductsList";

interface dataType {
  data: productDataType[];
}

const Product1 = ({ data }: dataType) => {
  console.log(data, "dadasdadasda");
  return (
    <div className="flex flex-col justify-center items-center mt-10 font-silkscreen text-4xl">
      <div className="relative">
        <h1 className="bg-red-500 px-14 py-10 cursor-pointer z-10 relative text-white ">
          T-Shirt
        </h1>
        <div className="w-full bg-black h-full absolute top-5 right-5"></div>
      </div>

      <div className=" flex my-10 justify-center gap-x-10 ">
        {data.map((item) => (
          <ProductsList key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Product1;
