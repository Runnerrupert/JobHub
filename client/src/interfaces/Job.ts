import { Customer } from './Customer';

export interface Job {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed'; 
    dueDate: string; 
    customer?: Customer;
}