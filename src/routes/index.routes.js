import { Router } from "express";
import { index, profile, gameScene } from "../controllers/index.controllers.js";
import { ifauth, ifnoauth } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", ifnoauth, index);
router.get("/profile", ifauth, profile);
router.get("/game/:id", gameScene);

export default router;
