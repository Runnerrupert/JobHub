import { Schema, model, Document } from 'mongoose';

interface IEmployee extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    hireDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

const employeeSchema = new Schema<IEmployee>(
    {
        name: {
            type: String,
            required: true,
            maxlength: 255
        },
        email: { 
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
            unique: true
        },
        role: {
            type: String
        },
        hireDate: {
            type: Date,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

const Employee = model<IEmployee>('Employee', employeeSchema)

export default Employee;