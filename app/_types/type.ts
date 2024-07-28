export interface variantType {
  _id: string;
  product: productDataType;
  color: string;
  sku: number;
  price: number;
  size: "s" | "m" | "l" | "xl" | "2xl";
  quantity: number;
  image: [string];
}
export interface productDataType {
  name: string;
  _id: string;
  desc: string;
  price: number;
  productSku: number;
  mainImage: string;
  image: [string];
  category: string;
  Variants: [variantType];
}
