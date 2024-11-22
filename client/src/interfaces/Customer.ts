import { Job } from "./Job";

export interface Customer {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    jobs?: Job[];
}
