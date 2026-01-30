import express, { NextFunction, Request, Response, Router } from 'express';
import { assignTutorToCategoryController } from './assignTutorToCategory.controller';

const router = express.Router();



router.post(
    "/",
    assignTutorToCategoryController.createAssignTutorToCategory
)


export const assignTutorToCategoryRouter: Router = router;