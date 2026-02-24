import express, { NextFunction, Request, Response, Router } from 'express';
import { userController } from './user..controller';

const router = express.Router();



router.get(
    "/",
    userController.getAllUser
)


export const userRouter: Router = router;