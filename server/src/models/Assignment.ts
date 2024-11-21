import { Schema, model, type Document } from 'mongoose';

interface IAssignment extends Document {
    title: string;
    jobId: Schema.Types.ObjectId;
    employeeIds: Schema.Types.ObjectId[];
}

const assignmentSchema = new Schema<IAssignment>(
    {
        title: {
            type: String,
            required: true
        },
        jobId: {
            type: Schema.Types.ObjectId,
            ref: 'Job',
            required: true
        },
        employeeIds: [{
            type: Schema.Types.ObjectId,
            ref: 'Employee'
        }],
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
)

const Assignment = model<IAssignment>('Assignment', assignmentSchema)

export default Assignment;