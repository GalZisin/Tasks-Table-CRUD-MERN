import { Schema, model } from 'mongoose';

const TaskSchema = new Schema<ITask>({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Task must belong to a User!'],
    },
    nameOfUser: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        lowercase: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model('Task', TaskSchema);

export interface ITask extends Document {
    user: Schema.Types.ObjectId;
    nameOfUser: string;
    title: string;
    description: string;
    createdAt: Date;
}