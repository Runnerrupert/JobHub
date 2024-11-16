import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IManager extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    isCorrectPassword(password: string): Promise<boolean>;
}

const managerSchema = new Schema<IManager>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

managerSchema.pre<IManager>('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

managerSchema.methods.isCorrectPassword = async function(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

const Manager = model<IManager>('Manager', managerSchema);

export default Manager;