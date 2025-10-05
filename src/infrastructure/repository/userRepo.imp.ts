import mongoose from "mongoose";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repository/user.repo";
import userModel from "../database/mongoose/user.model";



export class UserRepositoryImp implements IUserRepository {


    async findUserById(userId: string): Promise<User | null> {

        const id = new mongoose.Types.ObjectId(userId);
        const user = await userModel.findOne({ _id: id });
        if (!user) return null;
        return user;
    }

    async findUserByEmail(email: string): Promise<User | null> {

        const user = await userModel.findOne({ email });
        if (user) return user;
        return null;
    }

    async createUser(email: string, password: string, userName: string): Promise<User> {

        const newUser = new userModel({
            email,
            password,
            userName
        });

        const userData = await newUser.save();

        if (!userData) {
            throw new Error('Couldnt create new user.');
        }

        return userData;
    }

}