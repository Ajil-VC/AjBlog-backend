import { Attachment, Genre, Post } from "../../../domain/entities/post";
import { IPostRepository } from "../../../domain/repository/post.repo";
import { ICloudinary } from "../../../domain/services/cloudinary.interface";
import { IUpdateStoryUsecase } from "../../interface/postsusecase.interface";


export class UpdateStoryUsecase implements IUpdateStoryUsecase {

    constructor(private _postRepo: IPostRepository, private _cloudinary: ICloudinary) { }

    async execute(storyId: string, title: string, content: string, genre: Genre, file: Express.Multer.File): Promise<Post> {

        let imageData: Attachment | null = null;
        if (file) {

            const oldData = await this._postRepo.getStoryWithId(storyId);
            if (oldData.imageUrl) {
                await this._cloudinary.deleteImage(oldData.imageUrl.public_id);
            }
            imageData = file ? await this._cloudinary.uploadImage(file, 'Story') : null;
        }

        const updatedData = await this._postRepo.updateStory(storyId, title, content, genre, imageData);
        return updatedData;
    }
}