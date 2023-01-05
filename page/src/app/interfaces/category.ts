export interface Category {
  _id: string;
  parent_id: string;
  name: {
    es: string,
    en: string,
  };
  slug: {
    es: string,
    en: string,
  };
  description: {
    es: string,
    en: string,
  };
  type: string;
  image: string;
  active: boolean;
  status: boolean;
}
