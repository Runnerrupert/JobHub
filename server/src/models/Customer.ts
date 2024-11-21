import { Schema, model, type Document } from 'mongoose';

interface ICustomer extends Document {
    name: string;
    email: string;
    phoneNumber?: string;
    address?: string;
    jobs?: Schema.Types.ObjectId[];
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
        jobs: {
            type: Schema.Types.ObjectId, 
            ref: 'Job'
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