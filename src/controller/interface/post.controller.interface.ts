import { NextFunction, Request, Response } from "express";



export interface IStoryController {
    updateStory(req: Request, res: Response, next: NextFunction): Promise<void>;
    createStory(req: Request, res: Response, next: NextFunction): Promise<void>;
    getStories(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCurrentUserStories(req: Request, res: Response, next: NextFunction): Promise<void>;
}
