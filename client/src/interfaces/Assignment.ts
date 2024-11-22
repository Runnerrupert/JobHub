import { Job } from "./Job";
import { Employee } from "./Employee";

export interface Assignment {
    id: string;
    title: string;
    job?: Job;
    employees?: [Employee];
}
