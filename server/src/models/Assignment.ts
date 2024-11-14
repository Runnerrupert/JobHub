import { Schema, model, Document } from 'mongoose';

interface IAssignment extends Document {
    jobId: Schema.Types.ObjectId;
    employeeId: Schema.Types.ObjectId;
    assignedAt?: Date;
}

const assignmentSchema = new Schema<IAssignment>(
    {
        jobId: {
            type: Schema.Types.ObjectId,
            ref: 'Job',
            required: true
        },
        employeeId: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
            required: true
        },
        assignedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
)

const Assignment = model<IAssignment>('Assignment', assignmentSchema)

export default Assignment;