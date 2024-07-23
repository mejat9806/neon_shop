interface optionsType {
  color: string;
  sizes: [
    {
      size: string;
      qty: number;
    },
  ];
}

export interface productDataType {
  name: string;
  _id: string;
  price: number;
  front: string;
  back: string;
  category: string;
  qty: number;
  options: [optionsType];
}
