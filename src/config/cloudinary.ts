import { v2 as cloudinary } from 'cloudinary';
import { config } from './config';
cloudinary.config({
    cloud_name: config.CLOUDNAME,
    secure: true,
    api_key: config.CLOUD_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
});

export default cloudinary;