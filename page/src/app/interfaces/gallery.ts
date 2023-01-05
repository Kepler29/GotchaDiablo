export interface Gallery {
  _id: string;
  name: string;
  slug: string;
  images: [];
  active: boolean;
  delete: boolean;
}
