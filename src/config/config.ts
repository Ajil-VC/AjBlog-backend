import dotenv from 'dotenv'
dotenv.config();

export const config = {

    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    FRONTEND_URL: process.env.FRONTEND_URL,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,

    MAX_AGE: Number(process.env.MAX_AGE) || 0,

    CLOUDNAME: process.env.CLOUDNAME || '',
    CLOUD_API_KEY: process.env.CLOUD_API_KEY || '',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',

}