import { Job } from "./Job";
import { Employee } from "./Employee";

export interface Assignment {
    id: string;
    job: Job;
    employee: Employee;
}
