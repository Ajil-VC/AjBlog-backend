import { User } from "../../domain/entities/user";


export interface ICreateUserUsecase {
    execute(email: string, password: string, userName: string): Promise<{ userData: User, refreshToken: string, accessToken: string }>;
}

export interface ISigninUsecase {
    execute(email: string, password: string): Promise<{ userData: User, refreshToken: string, accessToken: string }>;
}

export interface IRefreshTokenUsecase {
    execute(refreshtoken: string): Promise<{ status: boolean, token?: string, message?: string }>;
}
