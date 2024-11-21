export interface Job {
    id: string;
    title: string;
    status: string;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    createdAt?: string;
    updatedAt?: string;
    jobs?: Job[];
}
