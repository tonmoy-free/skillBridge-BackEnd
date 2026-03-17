import express, { NextFunction, Request, Response, Router } from 'express';
import { userController } from './user..controller';
import auth, { UserRole } from '../../middleware/auth';

const router = express.Router();



router.get(
    "/",
    auth(UserRole.ADMIN),
    userController.getAllUser
);

router.get(
    "/:id",
    auth(UserRole.ADMIN,UserRole.STUDENT),
    userController.getSingleStudentById
);

router.delete(
    "/:id",
    auth(UserRole.ADMIN),
    userController.deleteUser
);

router.patch(
    "/:id",
    auth(UserRole.ADMIN),
    userController.updateUser
);

router.patch(
    "/student/:id",
    auth(UserRole.ADMIN,UserRole.STUDENT),
    userController.updateUserInDBbyId
);




export const userRouter: Router = router;