import { User } from "./user";

export interface Reservation {
    _id: string;
    user: User;
    date: Date;
    active: boolean;
    delete: boolean;
}
