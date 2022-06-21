import { Company } from "./company";

export interface User {
    uid: string;
    name: string;
    email: string;
    password: string;
    pass: string;
    role: string;
    avatar: string;
    active: boolean;
    company: Company
}
