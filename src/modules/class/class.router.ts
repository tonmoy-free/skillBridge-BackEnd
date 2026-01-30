import express, { NextFunction, Request, Response, Router } from 'express';
import { classController } from './class.controller';

const router = express.Router();



router.post(
    "/",
    classController.createClass
);

router.get(
    "/",
    classController.getAllClasses
)


export const classRouter: Router = router;