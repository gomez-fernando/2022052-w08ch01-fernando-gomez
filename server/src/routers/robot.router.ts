import { Router } from "express";
import { RobotController } from "../controllers/robot.controller.js";
import { Robot } from "../models/robot.model.js";

export const robotController = new RobotController(Robot);
export const robotRouter = Router();

robotRouter.get('/', robotController.getAll);
robotRouter.get('/:id', robotController.getById);
robotRouter.post('/', robotController.post);
robotRouter.patch('/:id', robotController.patch);
robotRouter.delete('/:id', robotController.delete);
