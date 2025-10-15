


export interface User {
    _id: string,
    userName: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date
}


export interface ReqUser {
    id: string,
    email: string,
    userName: string,
    iat: number,
    exp: number
}