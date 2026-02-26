import express, { NextFunction, Request, Response, Router } from 'express';
import { classController } from './class.controller';
import auth, { UserRole } from '../../middleware/auth';

const router = express.Router();


router.get(
    "/",
    classController.getAllClasses
)

router.get(
    "/:id",
    classController.getSingleClassById
)

router.post(
    "/",
    classController.createClass
);

router.patch(
    "/:id",
    auth(UserRole.ADMIN),
    classController.updateClass
)

router.delete(
    "/:id",
    auth(UserRole.ADMIN),
    classController.deleteClass
);



export const classRouter: Router = router;