import express, { NextFunction, Request, Response, Router } from 'express';
import { classController } from './class.controller';

const router = express.Router();



router.post(
    "/",
    classController.createClass
)


export const classRouter: Router = router;