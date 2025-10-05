import { Request, Response, NextFunction } from "express";
import { IUserController } from "./interface/user.controller.interface";
import { ICreateUserUsecase, ISigninUsecase } from "../application/interface/userusecase.interface";
import { HTTP_STATUS_CODE } from "./constants/httpstatuscode";
import { RESPONSE_MESSAGES } from "./constants/httpstatusresponse";
import { RefreshTokenUseCase } from "../application/usecase/users/refreshtoken.usecase";
import { ApiResponse } from "../domain/entities/response.object";


export class UserController implements IUserController {

    constructor(
        private _createUser: ICreateUserUsecase,
        private _signIn: ISigninUsecase,
        private _refreshTokenUsecase: RefreshTokenUseCase
    ) { }


    isValidUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            if (req.user) {

                const response: ApiResponse<any> = {
                    status: true,
                    message: RESPONSE_MESSAGES.COMMON.SUCCESS,
                    data: req.user
                }

                res.status(HTTP_STATUS_CODE.OK).json(response);
                return;
            }

            res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({ status: false });
            return;
        } catch (err) {
            next(err);
        }
    }


    signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const { email, password } = req.body;
            const result = await this._signIn.execute(email, password);

            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: false, //If it is https set it as true.
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(HTTP_STATUS_CODE.CREATED).json({
                status: true,
                accesstoken: result.accessToken,
                data: result.userData,
                message: RESPONSE_MESSAGES.AUTH.LOGIN_SUCCESS
            });

        } catch (err) {
            next(err);
        }
    }

    createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const { email, password, userName } = req.body;
            const data = await this._createUser.execute(email, password, userName);

            res.cookie('refreshToken', data.refreshToken, {
                httpOnly: true,
                secure: false, //If it is https set it as true.
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.status(HTTP_STATUS_CODE.CREATED).json({
                status: true,
                accesstoken: data.accessToken,
                data: data.userData,
                message: RESPONSE_MESSAGES.AUTH.REGISTRATION_SUCCESS
            });

            return;

        } catch (err) {
            next(err);
        }
    }



    refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({ message: 'No refresh token provided' });
                return
            }

            const result = await this._refreshTokenUsecase.execute(refreshToken);
            if (!result.status) {
                res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ status: false, message: result.message });
                return;
            } else {

                res.status(HTTP_STATUS_CODE.OK).json({
                    status: true,
                    token: result.token
                });

            }


        } catch (err) {

            next(err);

        }
    }


}