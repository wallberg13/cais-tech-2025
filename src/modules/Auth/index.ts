import { Validate } from "@middlewares/validate-schema";
import { Router } from "express";
import AuthController from "./controllers/AuthController";
import { AuthSchema } from "./schemas/AuthSchema";
import { EnsureAuth } from "@middlewares/ensureAuth";

const router = Router();
// bcvdtcfcycsyfcyfscyfsycyfscfcfysfcd
// dcvdycyvcydvcydbcd
/**
 * Route for creating a new User
 * POST http(s)://{host}/api/auth
 */
router.post("/", Validate(AuthSchema), AuthController.create);

/**
 * Route for creating a new User
 * GET http(s)://{host}/api/auth/verify_token
 */
router.get("/verify_token", EnsureAuth, AuthController.index);

export default router;
