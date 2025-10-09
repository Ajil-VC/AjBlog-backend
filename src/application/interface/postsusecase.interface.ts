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

export interface IGetStoryWithIdUsecase {
    execute(storyId: string): Promise<Post>;
}

export interface IPublishStoryUsecase {
    execute(storyId: string): Promise<Post>;
}

export interface IRemoveStoryUsecase {
    execute(storyId: string): Promise<boolean>;
}

export interface IUpdateStoryUsecase {
    execute(storyId: string, title: string,
        content: string,
        genre: Genre,
        file: Express.Multer.File): Promise<Post>;
}