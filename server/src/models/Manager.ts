import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IManager extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    isCorrectPassword(password: string): Promise<boolean>;
}

const managerSchema = new Schema<IManager>(
    {
        name: {
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
        if (!this.isModified('password') || bcrypt.getRounds(this.password) === 0) {
            this.password = await bcrypt.hash(this.password, 10);  
        }
    }
    next();
});

managerSchema.methods.isCorrectPassword = async function(password: string): Promise<boolean> {
    console.log(`Your Password: ${password}, Other Password: ${this.password}`);
    const result = bcrypt.compare(password, this.password);
    console.log("comparison result: ", result);
    return result;
};

const Manager = model<IManager>('Manager', managerSchema);

export default Manager;