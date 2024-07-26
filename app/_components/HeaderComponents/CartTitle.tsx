import { Dispatch, SetStateAction } from "react";

const CartTitle = ({
  setIsCartOpen,
}: {
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const cartItem = 2;
  const hasItemIncart = true;
  const cart = hasItemIncart ? <h1>Cart({cartItem})</h1> : <h1>Cart</h1>;
  return (
    <nav
      className="cursor-pointer"
      onClick={() => {
        setIsCartOpen((openCart) => !openCart);
      }}
    >
      {cart}
    </nav>
  );
};

export default CartTitle;
