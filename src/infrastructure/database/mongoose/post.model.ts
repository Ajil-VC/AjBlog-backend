import mongoose, { Schema } from "mongoose";
import { genre, Post } from "../../../domain/entities/post";


const postSchema = new Schema<Post>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: {
        type: {
            public_id: { type: String, required: true },
            url: { type: String, required: true }
        },
        default: null
    },
    genre: { type: String, enum: genre, required: true, default: 'other' },
    active: { type: Boolean, required: true, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const postModel = mongoose.model("Post", postSchema);
export default postModel;