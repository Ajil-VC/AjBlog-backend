import { IGetStoriesUsecase, IUpdateStoryUsecase } from "../../application/interface/postsusecase.interface";
import { CreateStoryUsecase } from "../../application/usecase/posts/createstory.usecase";
import { GetStoriesUsecase } from "../../application/usecase/posts/getstories.usecase";
import { UpdateStoryUsecase } from "../../application/usecase/posts/updatestory.usecase";
import { StoryController } from "../../controller/post.controller";
import { IPostRepository } from "../../domain/repository/post.repo";
import { ICloudinary } from "../../domain/services/cloudinary.interface";
import { PostRepositoryImp } from "../../infrastructure/repository/postRepo.imp";
import { CloudUploadService } from "../../infrastructure/services/cloudinary.service";


const uploadImage: ICloudinary = new CloudUploadService();
const postRepository: IPostRepository = new PostRepositoryImp();
const createStoryUsecase = new CreateStoryUsecase(uploadImage, postRepository);
const getStoriesUsecase: IGetStoriesUsecase = new GetStoriesUsecase(postRepository);
const updateStoryUsecase: IUpdateStoryUsecase = new UpdateStoryUsecase(postRepository, uploadImage);
export const storyControllerInterface = new StoryController(createStoryUsecase, getStoriesUsecase, updateStoryUsecase);