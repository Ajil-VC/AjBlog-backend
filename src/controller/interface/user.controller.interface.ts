import { NextFunction, Request, Response } from "express";


export interface IUserController {

    createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    signin(req: Request, res: Response, next: NextFunction): Promise<void>;
    isValidUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    refreshToken(req: Request, res: Response, next: NextFunction): Promise<void>;
}