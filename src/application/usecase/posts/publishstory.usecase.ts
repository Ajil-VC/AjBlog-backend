import { Post } from "../../../domain/entities/post";
import { IPostRepository } from "../../../domain/repository/post.repo";
import { IPublishStoryUsecase } from "../../interface/postsusecase.interface";


export class PublishStoryUsecase implements IPublishStoryUsecase {

    constructor(private _postRepo: IPostRepository) { }
    async execute(storyId: string): Promise<Post> {

        const result = await this._postRepo.publishStory(storyId);
        return result;
    }
}