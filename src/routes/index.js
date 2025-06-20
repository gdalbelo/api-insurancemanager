import { Router } from "express";
import userRouter from "./user.route.js";
import postRouter from "./post.route.js";
import authRouter from "./auth.route.js";
import insuranceRouter from "./insurance.route.js";
import insurerRouter from "./insurer.route.js";
import swaggerRouter from "./swagger.route.js";

const router = Router();

router.use("/user", userRouter);
router.use("/posts", postRouter);
router.use("/insurances", insuranceRouter);
router.use("/insurers", insurerRouter);
router.use("/auth", authRouter);
router.use("/doc", swaggerRouter);

export default router;
