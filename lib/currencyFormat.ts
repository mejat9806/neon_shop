const currencyFormat = (price: number) => {
  const formatedPrice = Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
  }).format(price);

  return formatedPrice;
};

export default currencyFormat;
