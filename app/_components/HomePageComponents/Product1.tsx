import { data as datas } from "@/lib/data";
import ProductsList from "../HomePage_Products/ProductsList";
import { productDataType } from "@/app/_types/type";
import { title } from "process";

interface dataType {
  data: productDataType[];
}

const Product1 = ({ data }: dataType) => {
  console.log(data, "dadasdadasda");
  return (
    <div className=" flex my-10 justify-center gap-x-10 ">
      {data.map((item) => (
        <ProductsList key={item._id} data={item} />
      ))}
    </div>
  );
};

export default Product1;
