
import { config } from "../../../config/config";
import { IUserRepository } from "../../../domain/repository/user.repo";
import { IRefreshTokenUsecase } from "../../interface/userusecase.interface";
import jwt from 'jsonwebtoken';



export class RefreshTokenUseCase implements IRefreshTokenUsecase {

    constructor(private _userRepo: IUserRepository) { }

    async execute(refreshToken: string): Promise<{ status: boolean, token?: string, message?: string }> {

        if (typeof config.REFRESH_TOKEN_SECRET !== 'string') throw new Error('Token Secret missing.');

        const userPayload = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);

        if (!userPayload || typeof userPayload === 'string' || !('id' in userPayload)) {

            return {
                status: false,
                message: 'user payload not available.'
            }
        }
        const userData = await this._userRepo.findUserById(userPayload.id);

        if (!userData) {
            return { status: false, message: 'Couldnt findout the user.' };
        }

        if (!config.ACCESS_TOKEN_SECRET) {
            throw new Error('JWT secret key is not defined.');
        }

        const accessToken = jwt.sign(
            {
                id: userData._id,
                email: userData.email,
                name: userData.userName
            },
            config.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '15m' }
        );


        return {
            status: true,
            token: accessToken
        }
    }

}