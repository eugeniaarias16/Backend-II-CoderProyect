import { Router } from "express";
import { SessionController } from "../controllers/sessions.controller.js";

export const sessionRouter = Router();

sessionRouter.post('/register',SessionController.register);