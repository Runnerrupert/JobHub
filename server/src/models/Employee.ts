import { Schema, model, type Document } from 'mongoose';

interface IEmployee extends Document {
    name: string;
    email: string;
    phoneNumber?: string;
    role?: string;
    assignments?: Schema.Types.ObjectId[];
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
        assignments: [{
            type: Schema.Types.ObjectId, 
            ref: 'Assignment'
        }]
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

const Employee = model<IEmployee>('Employee', employeeSchema)

export default Employee;