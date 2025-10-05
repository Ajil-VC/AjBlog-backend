
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/connectDB';
import http from 'http';
import { config } from './config/config';
import { userRouter } from './routes/userRoute';
import { UserAlreadyExistsError } from './application/errors/userexists.error';
import cookieParser from "cookie-parser";
import { HTTP_STATUS_CODE } from './controller/constants/httpstatuscode';
import { ERROR_CODE } from './controller/constants/errorcode';

connectDB();

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true
}))

const server = http.createServer(app);
app.use('/api/v1', userRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {

    if (err instanceof UserAlreadyExistsError) {
        res.status(HTTP_STATUS_CODE.CONFLICT).json({ message: err.message, code: ERROR_CODE.DUPLICATION_ERROR });
        return
    }

    if (err.name === "ValidationError") {
        res.status(400).json({
            status: false,
            message: "Validation failed",
            code: ERROR_CODE.VALIDATION_ERROR
        });
        return;
    }

    if (err.name === "BSONError") {
        res.status(400).json({ status: false, message: "Please re ensure the operation, something is wrong.", code: ERROR_CODE.BSON_ERROR });
        return;
    }

    if (err.name === "CastError") {
        res.status(400).json({
            status: false,
            message: "Invalid ID format",
            code: ERROR_CODE.CAST_ERROR
        });
        return;
    }

    if (err.name === ERROR_CODE.JWT_ERROR) {
        res.status(500).json({ status: false, message: err.message, code: ERROR_CODE.JWT_ERROR });
        return;
    }

    res.status(500).json({ message: err.message, code: ERROR_CODE.UNKNOWN });
});

server.listen(config.PORT, () => {
    console.log(`Hmm, Blog app is running at port ${config.PORT}`);
});