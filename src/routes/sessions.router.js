import { Router } from "express";
import { SessionController } from "../controllers/sessions.controller.js";

export const sessionRouter = Router();

sessionRouter.get('/current',SessionController.current);


sessionRouter.post('/register',SessionController.register);
sessionRouter.post('/login',SessionController.login);

