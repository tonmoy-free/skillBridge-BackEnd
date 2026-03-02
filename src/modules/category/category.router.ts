import express, { NextFunction, Request, Response, Router } from 'express';
import { categoryController } from './category.controller';
import auth, { UserRole } from '../../middleware/auth';

const router = express.Router();

router.post(
    "/",
    categoryController.createCategory
);

router.get(
    "/",
    categoryController.getAllCategory
);

router.get(
    "/:id",
    categoryController.getSingleCategoryById
);

router.delete(
    "/:id",
    auth(UserRole.ADMIN),
    categoryController.deleteCategory
);

router.patch(
    "/:id",
    auth(UserRole.ADMIN),
    categoryController.updateCategory
);


export const categoryRouter: Router = router;