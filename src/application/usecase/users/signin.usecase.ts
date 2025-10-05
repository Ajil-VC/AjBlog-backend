import { config } from "../../../config/config";
import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/repository/user.repo";
import { ISecurePassword } from "../../../domain/services/securepassword.interface";
import { InvalidCredentials } from "../../errors/invalidcredentials.error";
import { ISigninUsecase } from "../../interface/userusecase.interface";
import jwt from 'jsonwebtoken';


export class SignInUsecase implements ISigninUsecase {

    constructor(private _userRepo: IUserRepository, private _passwordSecure: ISecurePassword) { }

    async execute(email: string, password: string): Promise<{ userData: User; refreshToken: string; accessToken: string; }> {

        const user = await this._userRepo.findUserByEmail(email);
        if (!user) {
            throw new InvalidCredentials();
        }

        const isPasswordValid = await this._passwordSecure.validatePassword(password, user.password);
        if (!isPasswordValid) {
            throw new InvalidCredentials();
        }

        if (!config.REFRESH_TOKEN_SECRET || !config.ACCESS_TOKEN_SECRET) {
            throw new Error('Token secret key missing.');
        }

        const refreshToken = jwt.sign(
            {
                id: user._id
            },
            config.REFRESH_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        const accessToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                userName: user.userName
            },
            config.ACCESS_TOKEN_SECRET!,
            { expiresIn: '15m' }
        );

        return { userData: user, accessToken, refreshToken };
    }

}