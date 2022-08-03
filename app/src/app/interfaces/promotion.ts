export interface Promotion {
    _id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    dateStart: Date;
    dateEnd: Date;
    intro: string;
    image: string;
    active: boolean;
    delete: boolean;
}
