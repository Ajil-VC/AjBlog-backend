import { Genre, Post } from "../../domain/entities/post";

export interface ICreateStoryUsecase {
    execute(
        userId: string,
        title: string,
        content: string,
        genre: Genre,
        file: Express.Multer.File): Promise<Post>;
}

export interface IGetStoriesUsecase {
    execute(limit: number, skip: number, searchTerm: string, userId?: string): Promise<{ posts: Post[], totalPages: number }>;
}

export interface IUpdateStoryUsecase {
    execute(storyId: string, title: string,
        content: string,
        genre: Genre,
        file: Express.Multer.File): Promise<Post>;
}