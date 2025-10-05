import { ObjectId } from "mongoose";


export const genre = [
    'Personal & Lifestyle',
    'Technology & Science',
    'Business & Finance',
    'Arts & Entertainment',
    'Society & Culture',
    'Education & Learning',
    'Miscellaneous / Fun',
    'other'
] as const;

export type Genre = typeof genre[number];

export interface Attachment {
    public_id: string;
    url: string;
}

export interface Post {

    _id: ObjectId,
    title: string,
    content: string,
    imageUrl: Attachment,
    genre: Genre,
    active: boolean,
    likes: string[],
    userId: ObjectId,

    createdAt?: Date,
    updatedAt?: Date
}
