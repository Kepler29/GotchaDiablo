import {Category} from "./category";

export interface Product {
  _id: string;
  name: {
    es: string;
    en: string;
  };
  slug: {
    es: string;
    en: string;
  };
  new: boolean;
  novelty: boolean;
  code: string;
  price: number;
  modelo: string;
  description: {
    es: string;
    en: string;
  };
  details: {
    es: string;
    en: string;
  };
  image: string;
  active: boolean;
  categories: Category[]

}
