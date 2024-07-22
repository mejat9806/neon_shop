import { data } from "@/lib/data";
import ProductsList from "../HomePage_Products/ProductsList";

const Product1 = () => {
  return (
    <div className=" flex my-10 justify-center gap-x-10">
      {data.shirt.Summer.map((item) => (
        <ProductsList key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Product1;
