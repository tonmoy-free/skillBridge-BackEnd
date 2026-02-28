import express, { NextFunction, Request, Response, Router } from 'express';
import { userController } from './user..controller';
import auth, { UserRole } from '../../middleware/auth';

const router = express.Router();



router.get(
    "/",
    auth(UserRole.ADMIN),
    userController.getAllUser
);

router.patch(
    "/:id",
    auth(UserRole.ADMIN),
    userController.updateUser
);




export const userRouter: Router = router;