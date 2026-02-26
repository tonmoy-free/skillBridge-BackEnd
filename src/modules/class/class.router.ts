import express, { NextFunction, Request, Response, Router } from 'express';
import { classController } from './class.controller';
import auth, { UserRole } from '../../middleware/auth';

const router = express.Router();


router.get(
    "/",
    classController.getAllClasses
)

router.post(
    "/",
    classController.createClass
);

router.delete(
    "/:id",
    auth(UserRole.ADMIN),
    classController.deleteClass
);



export const classRouter: Router = router;