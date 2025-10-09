import { Post } from "../../../domain/entities/post";
import { IPostRepository } from "../../../domain/repository/post.repo";
import { IGetStoryWithIdUsecase } from "../../interface/postsusecase.interface";

export class GetStoryWithIdUsecase implements IGetStoryWithIdUsecase {

    constructor(private _postRepo: IPostRepository) { }

    async execute(storyId: string): Promise<Post> {

        const story = await this._postRepo.getStoryWithId(storyId);
        return story;
    }


}