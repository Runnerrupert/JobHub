import { Schema, model, type Document } from 'mongoose';

interface ICustomer extends Document {
    name: string;
    email: string;
    phoneNumber?: string;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const customerSchema = new Schema<ICustomer>(
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
        address: { 
            type: String 
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

  const Customer = model<ICustomer>('Customer', customerSchema);

  export default Customer;