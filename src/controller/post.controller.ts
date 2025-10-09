import { NextFunction, Request, Response } from "express";
import { IStoryController } from "./interface/post.controller.interface";
import { ICreateStoryUsecase, IGetStoriesUsecase, IGetStoryWithIdUsecase, IPublishStoryUsecase, IRemoveStoryUsecase, IUpdateStoryUsecase } from "../application/interface/postsusecase.interface";
import { RESPONSE_MESSAGES } from "./constants/httpstatusresponse";
import { HTTP_STATUS_CODE } from "./constants/httpstatuscode";
import { ApiResponse } from "../domain/entities/response.object";
import { Post } from "../domain/entities/post";


export class StoryController implements IStoryController {

    constructor(
        private _createStory: ICreateStoryUsecase,
        private _getStories: IGetStoriesUsecase,
        private _updateStory: IUpdateStoryUsecase,
        private _getStory: IGetStoryWithIdUsecase,
        private _deleteStory: IRemoveStoryUsecase,
        private _publishStory: IPublishStoryUsecase
    ) { }

    publishStory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            console.log(req.body)
            const storyId = req.body.storyId || '';

            const result = await this._publishStory.execute(storyId);

            const response: ApiResponse<Post> = {
                status: true,
                message: RESPONSE_MESSAGES.STORY.PUBLISHED,
                data: result
            };

            res.status(HTTP_STATUS_CODE.OK).json(response);

        } catch (err) {
            next(err);
        }

    }

    deleteStory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const storyId = typeof req.query.storyid !== 'string' || req.query.storyid === 'undefined' ? '' : req.query.storyid;

            const result = await this._deleteStory.execute(storyId);


            if (result) {
                const response: ApiResponse<true> = {
                    status: true,
                    message: RESPONSE_MESSAGES.STORY.REMOVED,
                    data: true
                }
                res.status(HTTP_STATUS_CODE.OK).json(response);
                return;
            }


            const response: ApiResponse<false> = {
                status: false,
                message: RESPONSE_MESSAGES.COMMON.FAILED,
                data: false
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(response);
            return;

        } catch (err) {
            next(err);
        }
    }

    getCurrentUserStories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const page = req.query.page;
            const searchTerm = typeof req.query.query !== 'string' || req.query.query === 'undefined' ? ''
                : req.query.query;

            const pageNum =
                typeof page === "string"
                    ? parseInt(page)
                    : 1;
            const limit = 20;
            const skip = (pageNum - 1) * limit;

            const result = await this._getStories.execute(limit, skip, searchTerm, req.user.id);

            const response: ApiResponse<Post[]> = {
                status: true,
                message: RESPONSE_MESSAGES.COMMON.SUCCESS,
                data: result.posts,
                totalPages: result.totalPages
            }

            res.status(HTTP_STATUS_CODE.OK).json(response);
            return;

        } catch (err) {
            next(err);
        }
    }

    getStories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const page = req.query.page;
            const searchTerm = typeof req.query.query !== 'string' || req.query.query === 'undefined' ? ''
                : req.query.query;

            const pageNum =
                typeof page === "string"
                    ? parseInt(page)
                    : 1;
            const limit = 4;
            const skip = (pageNum - 1) * limit;

            const result = await this._getStories.execute(limit, skip, searchTerm);
            const response: ApiResponse<Post[]> = {
                status: true,
                message: RESPONSE_MESSAGES.COMMON.SUCCESS,
                data: result.posts,
                totalPages: result.totalPages
            };

            res.status(HTTP_STATUS_CODE.OK).json(response);
            return;

        } catch (err) {
            next(err);
        }
    }

    createStory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const file = req.file as Express.Multer.File;
            const result = await this._createStory.execute(req.user.id, req.body.title, req.body.content, req.body.genre, file);
            const populatedStory = await this._getStory.execute(result._id as unknown as string);
            const response: ApiResponse<Post> = {
                status: true,
                message: RESPONSE_MESSAGES.STORY.CREATED,
                data: populatedStory
            }

            res.status(HTTP_STATUS_CODE.CREATED).json(response);
        } catch (err) {
            next(err);
        }
    }

    updateStory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const file = req.file as Express.Multer.File;
            const { title, content, genre, storyId } = req.body;

            const result = await this._updateStory.execute(storyId, title, content, genre, file);

            const response: ApiResponse<Post> = {
                status: true,
                message: RESPONSE_MESSAGES.STORY.UPDATED,
                data: result
            }

            res.status(HTTP_STATUS_CODE.OK).json(response);
            return;

        } catch (err) {
            next(err);
        }
    }


}