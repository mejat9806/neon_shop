import { useQuery } from "@tanstack/react-query";
import { getCartItem } from "./getCartItem";
import { v4 as uuidv4 } from "uuid";
export const useGetCart = ({
  color,
  size,
}: {
  color: string | null;
  size: string | null;
}) => {
  const ramdomId = uuidv4();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["cartItem", color, size],
    queryFn: () => getCartItem({ color, size }),
  });
  return { data, isLoading };
};
