export interface Job {
    id: string; 
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed'; 
    dueDate: string; 
    customerId: string; 
    createdAt?: string; 
    updatedAt?: string; 
  }
  