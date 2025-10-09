import { IGetStoriesUsecase, IGetStoryWithIdUsecase, IPublishStoryUsecase, IRemoveStoryUsecase, IUpdateStoryUsecase } from "../../application/interface/postsusecase.interface";
import { CreateStoryUsecase } from "../../application/usecase/posts/createstory.usecase";
import { GetStoriesUsecase } from "../../application/usecase/posts/getstories.usecase";
import { GetStoryWithIdUsecase } from "../../application/usecase/posts/getStory.usecase";
import { PublishStoryUsecase } from "../../application/usecase/posts/publishstory.usecase";
import { DeleteStoryUsecase } from "../../application/usecase/posts/removestory.usecast";
import { UpdateStoryUsecase } from "../../application/usecase/posts/updatestory.usecase";
import { StoryController } from "../../controller/post.controller";
import { IPostRepository } from "../../domain/repository/post.repo";
import { ICloudinary } from "../../domain/services/cloudinary.interface";
import { PostRepositoryImp } from "../../infrastructure/repository/postRepo.imp";
import { CloudUploadService } from "../../infrastructure/services/cloudinary.service";


const cloudinary: ICloudinary = new CloudUploadService();
const postRepository: IPostRepository = new PostRepositoryImp();
const createStoryUsecase = new CreateStoryUsecase(cloudinary, postRepository);
const getStoriesUsecase: IGetStoriesUsecase = new GetStoriesUsecase(postRepository);
const updateStoryUsecase: IUpdateStoryUsecase = new UpdateStoryUsecase(postRepository, cloudinary);
const getStoryWithIDUsecase: IGetStoryWithIdUsecase = new GetStoryWithIdUsecase(postRepository);
const deleteStoryUsecase: IRemoveStoryUsecase = new DeleteStoryUsecase(postRepository, cloudinary);
const publishStoryUsecase: IPublishStoryUsecase = new PublishStoryUsecase(postRepository);

export const storyControllerInterface = new StoryController(
    createStoryUsecase,
    getStoriesUsecase,
    updateStoryUsecase,
    getStoryWithIDUsecase,
    deleteStoryUsecase, publishStoryUsecase);