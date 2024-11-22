import { Schema, model, type Document } from 'mongoose';

interface IAssignment extends Document {
    job: Schema.Types.ObjectId;
    employees: Schema.Types.ObjectId[];
}

const assignmentSchema = new Schema<IAssignment>(
    {
        job: {
            type: Schema.Types.ObjectId,
            ref: 'Job',
            required: true
        },
        employees: [{
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