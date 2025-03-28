import { ProductNameTypes } from "../types";


export interface IProduct {
  // value: string | number | readonly string[] | undefined;
  id?: string | undefined;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}

export interface IFormInput {
  id: string;
  name: ProductNameTypes;
  label: string;
  type: string;
}

export interface ICategory {
  id: string;
  name: string;
  imageURL: string;
}
