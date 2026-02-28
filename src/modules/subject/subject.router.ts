import express, { NextFunction, Request, Response, Router } from 'express';
import { subjectController } from './subject.controller';
import auth, { UserRole } from '../../middleware/auth';

const router = express.Router();


router.post(
    "/",
    auth(UserRole.ADMIN),
    subjectController.createSubject
);

router.get(
    "/",
    subjectController.getAllSubject
);

router.delete(
    "/:id",
    auth(UserRole.ADMIN),
    subjectController.deleteSubject
)


export const subjectRouter: Router = router;