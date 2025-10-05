import mongoose, { ObjectId, Types } from "mongoose";
import { Attachment, Genre, Post } from "../../domain/entities/post";
import { IPostRepository } from "../../domain/repository/post.repo";
import postModel from "../database/mongoose/post.model";


export class PostRepositoryImp implements IPostRepository {


    async getStoryWithId(storyId: string): Promise<Post> {

        const storyOb = new mongoose.Types.ObjectId(storyId);
        const story = await postModel.findOne({ _id: storyOb });
        if (!story) throw new Error('No story exists.');
        return story;
    }


    async getStories(limit: number, skip: number, searchTerm: string, userId?: string): Promise<{ posts: Post[], totalPages: number }> {

        const matchQuery: { $match: { active: boolean, userId?: Types.ObjectId } } = { $match: { active: true } };

        if (userId) {
            const userOb = new mongoose.Types.ObjectId(userId);
            matchQuery.$match.userId = userOb;
        }


        const posts = await postModel.aggregate([
            matchQuery,
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            { $unwind: '$author' },

            {
                $match: {
                    $or: [
                        { title: { $regex: searchTerm, $options: 'i' } },
                        { genre: { $regex: searchTerm, $options: 'i' } },
                        { 'author.userName': { $regex: searchTerm, $options: 'i' } },
                        { 'author.email': { $regex: searchTerm, $options: 'i' } }
                    ]
                }
            },
            {
                $project: {
                    'author.password': 0,
                    'author.__v': 0
                }
            },

            {
                $facet: {
                    metaData: [{ $count: 'total' }],
                    data: [
                        { $sort: { createdAt: -1 } },
                        { $skip: skip }, { $limit: limit }
                    ]
                }
            },

            {
                $project: {
                    total: { $arrayElemAt: ["$metaData.total", 0] },
                    data: 1
                }
            }

        ]);

        const totalPages = Math.ceil(posts[0].total / limit);
        if (!posts) throw new Error('Stories are not available at the moment.');

        return { posts: posts[0].data, totalPages };
    }

    async createStory(userId: string, title: string, content: string, imageUrl: Attachment | null, genre: Genre): Promise<Post> {

        const userOb = new mongoose.Types.ObjectId(userId);

        const newStory = new postModel({
            userId: userOb,
            title,
            content,
            imageUrl,
            genre
        });

        const createdStory = await newStory.save();
        if (!createdStory) throw new Error('Couldnt create the new story.');

        return createdStory;
    }

    async updateStory(storyId: string, title: string, content: string, genre: Genre, imageUrl: Attachment | null): Promise<Post> {

        const storyOb = new mongoose.Types.ObjectId(storyId);
        const query: {
            $set: {
                title: string,
                content: string,
                genre: string,
                imageUrl?: Attachment
            }
        } = { $set: { title, content, genre } };
        if (imageUrl) {
            query.$set.imageUrl = imageUrl;
        }

        const post = await postModel.findByIdAndUpdate(storyOb, query, { new: true });
        if (!post) {
            throw new Error('Couldnt update the post.');
        }

        return post;
    }


}