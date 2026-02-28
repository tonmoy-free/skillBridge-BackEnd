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

router.get(
    "/:id",
    subjectController.getSingleSubjectById
);


router.delete(
    "/:id",
    auth(UserRole.ADMIN),
    subjectController.deleteSubject
);

router.patch(
    "/:id",
    auth(UserRole.ADMIN),
    subjectController.updateSubject
)


export const subjectRouter: Router = router;