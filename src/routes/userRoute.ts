import express from 'express';
import { userControllerInterface } from './dependency/users.route.interface';
import { authenticateUser } from '../infrastructure/middleware/user.middelware';
import { upload } from '../infrastructure/middleware/multer.middleware';
import { storyControllerInterface } from './dependency/posts.route.interface';


export const userRouter = express.Router();
userRouter.use(express.urlencoded({ extended: true }));

userRouter.post('/signup', userControllerInterface.createUser);
userRouter.post('/signin', userControllerInterface.signin);

userRouter.get('/authenticate-user', authenticateUser, userControllerInterface.isValidUser);
userRouter.post('/refresh-token', userControllerInterface.refreshToken);

userRouter.route('/posts')
    .post(authenticateUser, upload.single('image'), storyControllerInterface.createStory)
    .get(authenticateUser, storyControllerInterface.getCurrentUserStories)
    .put(authenticateUser, upload.single('image'), storyControllerInterface.updateStory);

userRouter.get('/all-posts', storyControllerInterface.getStories);