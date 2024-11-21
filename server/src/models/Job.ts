import { Schema, model, type Document } from 'mongoose';

interface IJob extends Document {
    title: string;
    description?: string;
    status: 'unassigned' | 'in-progress' | 'completed';
    dueDate?: Date;
    customerId: Schema.Types.ObjectId;
    assignmentId?: Schema.Types.ObjectId;
}

const jobSchema = new Schema<IJob>(
    {
        title: { 
            type: String, 
            required: true, 
            maxlength: 255 
        },
        description: { 
            type: String 
        },
        status: { 
            type: String, 
            required: true, 
            enum: ['pending', 'in-progress', 'completed'] 
        },
        dueDate: { 
            type: Date 
        },
        customerId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Customer', 
            required: true 
        },
        assignmentId: { 
            type: Schema.Types.ObjectId,
            ref: 'Assignment'
        }
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

const Job = model<IJob>('Job', jobSchema);

export default Job;