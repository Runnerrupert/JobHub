export interface Job {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed'; 
    dueDate: string; 
    customer?: Customer;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    jobs?: Job[];
}
