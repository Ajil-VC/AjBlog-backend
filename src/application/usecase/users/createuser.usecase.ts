import { config } from "../../../config/config";
import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/repository/user.repo";
import { ISecurePassword } from "../../../domain/services/securepassword.interface";
import { UserAlreadyExistsError } from "../../errors/userexists.error";
import { ICreateUserUsecase } from "../../interface/userusecase.interface";
import jwt from 'jsonwebtoken';


export class CreateUserUsecase implements ICreateUserUsecase {

    constructor(private _userRepo: IUserRepository, private _passwordSecure: ISecurePassword) { }

    async execute(email: string, password: string, userName: string): Promise<{ userData: User, refreshToken: string, accessToken: string }> {

        const isUserExist = await this._userRepo.findUserByEmail(email);
        if (isUserExist) {
            throw new UserAlreadyExistsError(email);
        }

        const hashedPassword = await this._passwordSecure.secure(password);
        const user = await this._userRepo.createUser(email, hashedPassword, userName);

        if (!user) {
            throw new Error('Couldnt create user.');
        }


        if (!config.REFRESH_TOKEN_SECRET) {
            throw new Error('JWT secret key is not defined.');
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

        return { userData: user, refreshToken, accessToken }


    }

}