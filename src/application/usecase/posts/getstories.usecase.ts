import { Post } from "../../../domain/entities/post";
import { IPostRepository } from "../../../domain/repository/post.repo";
import { IGetStoriesUsecase } from "../../interface/postsusecase.interface";


export class GetStoriesUsecase implements IGetStoriesUsecase {

    constructor(private _postRepository: IPostRepository) { }

    async execute(limit: number, skip: number, searchTerm: string, userId?: string): Promise<{ posts: Post[], totalPages: number }> {

        const posts = await this._postRepository.getStories(limit, skip, searchTerm, userId);
        return posts;
    }
}