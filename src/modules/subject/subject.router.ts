import express, { NextFunction, Request, Response, Router } from 'express';
import { subjectController } from './subject.controller';

const router = express.Router();



router.post(
    "/",
    subjectController.createSubject
)


export const subjectRouter: Router = router;