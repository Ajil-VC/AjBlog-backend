import { NextFunction, Request, Response } from "express";

import jwt from 'jsonwebtoken';
import { config } from "../../config/config";


declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

function verifyToken(token: string, secret: string): Promise<any> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ status: false, message: 'Unauthorized: Token missing or invalid token' });
        return
    }

    const token = authHeader.split(' ')[1] || '';
    if (!config.REFRESH_TOKEN_SECRET) {
        throw new Error('JWT secret key is not defined.');
    }


    try {

        if (typeof config.ACCESS_TOKEN_SECRET !== 'string') throw new Error('Token Secret missing.');
        const decoded: any = await verifyToken(token, config.ACCESS_TOKEN_SECRET);


        req.user = decoded;
        if (!req.user) throw new Error('Coudlnt autherize the user.');
        next();
    } catch (err: any) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            res.status(401).json({ status: false, message: 'Invalid or expired token.' });
            return
        }
        next(err);
    }

}