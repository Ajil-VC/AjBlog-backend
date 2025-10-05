import { User } from "../entities/user";


export interface IUserRepository {

    createUser(email: string, password: string, userName: string): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(userId: string): Promise<User | null>;
}