import { Attachment, Genre, Post } from "../entities/post";



export interface IPostRepository {
    getStoryWithId(storyId: string): Promise<Post>;
    createStory(userId: string, title: string, content: string, imageUrl: Attachment | null, genre: Genre): Promise<Post>;
    getStories(limit: number, skip: number, searchTerm: string, userId?: string): Promise<{ posts: Post[], totalPages: number }>;
    updateStory(storyId: string, title: string,
        content: string,
        genre: Genre,
        imageUrl: Attachment | null): Promise<Post>;
    deleteStory(storyId: string): Promise<boolean>;

    publishStory(storyId: string): Promise<Post>;
}