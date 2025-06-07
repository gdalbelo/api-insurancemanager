import insurerController from "../controllers/insurer.controller.js";
//import authMiddleware from "../middlewares/auth.middleware.js";
//import { validId } from "../middlewares/global.middleware.js";

import { Router } from "express";

const insurerRouter = Router();

insurerRouter.get("/", insurerController.findAllInsurersController);
insurerRouter.get("/top", insurerController.topNewsController);
//insurerRouter.get("/search", insurerController.searchInsurerController);

//insurerRouter.use(authMiddleware);
insurerRouter.post("/create", insurerController.createInsurerController);

//insurerRouter.use(validId);
insurerRouter.get("/byIdInsurer/:id", insurerController.findInsurerByIdController);
insurerRouter.get("/byUserId", insurerController.findInsurerByUserIdController);
insurerRouter.patch("/update/:id", insurerController.updateInsurerController);
insurerRouter.delete("/delete/:id", insurerController.deleteInsurerController);
insurerRouter.patch("/:id/like", insurerController.likeInsurerController);
insurerRouter.patch("/:id/comment", insurerController.commentInsurerController);
insurerRouter.patch(
  "/:id/:idComment/comment",
  insurerController.commentDeleteInsurerController
);

export default insurerRouter;
