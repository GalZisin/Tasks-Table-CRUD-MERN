import { Schema, model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';

// Create Schema
const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    register_date: {
        type: Date,
        default: Date.now,
    },
});

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//Compare user password
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {

    return await bcrypt.compare(enteredPassword, this.password);
};

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    comparePassword(enteredPassword: string): Promise<boolean>;
}
export default model<IUser>('User', userSchema);