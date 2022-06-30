export interface Package {
    _id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    intro: string;
    image: string;
    active: boolean;
    delete: boolean;
}
