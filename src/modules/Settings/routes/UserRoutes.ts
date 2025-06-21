// Routes for User with prefix 'api/settings/users'

import { Router } from "express";
import UserController from "../controllers/UserController";
import { Validate } from "@middlewares/validate-schema";
import {
  CreateUserSchema,
  DeleteUserSchema,
  UpdateUserSchema,
} from "../schemas/UserSchema";

const router = Router();

/**
 * Route for creating a new User
 * POST http(s)://{host}api/settings/users
 */
router.post("/", Validate(CreateUserSchema), UserController.create);

/**
 * Route for getting all Users
 * GET http(s)://{host}api/settings/users
 */
router.get("/", UserController.index);

/**
 * Route for updating a specific User by ID
 * PUT http(s)://{host}api/settings/users/:id
 */
router.put("/:id", Validate(UpdateUserSchema), UserController.update);

/**
 * Route for deleting a specific User by ID
 * PUT http(s)://{host}api/settings/users/:id
 */
router.delete("/:id", Validate(DeleteUserSchema), UserController.delete);

export default router;
