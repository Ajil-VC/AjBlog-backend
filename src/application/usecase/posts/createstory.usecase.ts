import { Genre, Post } from "../../../domain/entities/post";
import { IPostRepository } from "../../../domain/repository/post.repo";
import { ICloudinary } from "../../../domain/services/cloudinary.interface";
import { ICreateStoryUsecase } from "../../interface/postsusecase.interface";


export class CreateStoryUsecase implements ICreateStoryUsecase {

    constructor(private _uploadImage: ICloudinary, private _postRepo: IPostRepository) { }

    async execute(userId: string,
        title: string,
        content: string,
        genre: Genre,
        file: Express.Multer.File): Promise<Post> {

        const imageData = file ? await this._uploadImage.uploadImage(file, 'Story') : null;
        const result = await this._postRepo.createStory(userId, title, content, imageData, genre);

        return result;
    }

}