export const getCartItem = async ({
  color,
  size,
}: {
  color: string;
  size: string;
}) => {
  const res = await fetch(
    `http://localhost:3000/api/products/66a7428a7c480e315e829e04?color=${color}&size=${size}`,
  ).then((res) => res.json());
  return res;
};
