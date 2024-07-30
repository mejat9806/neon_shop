import { useQuery } from "@tanstack/react-query";
import { getCartItem } from "./getCartItem";
import { useContextStuff } from "@/app/_context/Context";

export const useGetCart = ({
  color,
  size,
}: {
  color: string;
  size: string;
}) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["cartItem", color, size], // Unique query key based on parameters
    queryFn: () => getCartItem({ color, size }),
  });
  return { data, isLoading };
};
