import { Router } from "express";

import { auth, student } from "../middlewares/auth";

import {
  createCheckOutSession,
  purchaseCourse,
} from "../controllers/payment/payment.controller";

const router = Router();

router.patch("/purchase-course/:courseId", auth, student, purchaseCourse);
router.post(
  "/create-checkout-session/:courseId",
  auth,
  student,
  createCheckOutSession
);

export default router;