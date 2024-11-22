import { Assignment } from "./Assignment";

export interface Employee {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    assignments?: Assignment[];
}