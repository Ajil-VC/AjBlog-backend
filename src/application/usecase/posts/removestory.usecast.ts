import { IPostRepository } from "../../../domain/repository/post.repo";
import { ICloudinary } from "../../../domain/services/cloudinary.interface";
import { IRemoveStoryUsecase } from "../../interface/postsusecase.interface";


export class DeleteStoryUsecase implements IRemoveStoryUsecase {

    constructor(private _postRepo: IPostRepository, private _cloudinary: ICloudinary) { }

    async execute(storyId: string): Promise<boolean> {

        const [result, story] = await Promise.all([
            this._postRepo.deleteStory(storyId),
            this._postRepo.getStoryWithId(storyId)
        ])

        if (result && story?.imageUrl?.public_id) {
            await this._cloudinary.deleteImage(story.imageUrl.public_id);
        }
        return result;

    }
}