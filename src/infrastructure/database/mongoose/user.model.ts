import mongoose, { Schema } from "mongoose";
import { User } from "../../../domain/entities/user";


const userSchema = new Schema<User>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    userName: { type: String, default: 'New User' },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;