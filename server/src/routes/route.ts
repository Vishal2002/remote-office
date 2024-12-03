import { Router } from "express";
import { loginSchema,registerSchema } from "../schemas/auth.schema";
import { validateRequest } from "../middleware/validate";
import { UserController } from "../controller/controller";
const router = Router();

//Auth API routes
router.post('/auth/register', validateRequest(registerSchema), UserController.registerUser as any);
router.post('/auth/login', validateRequest(loginSchema),UserController.login as any);

//Create Room



export default router;