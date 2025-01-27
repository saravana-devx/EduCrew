import express from "express";

import {
  getAdminDashboardDetails,
  getInstructorDashboard,
  getProfileDetails,
  updateProfile,
  deleteAccount,
} from "../controllers/profile/profile.controller";

import { admin, auth, instructor } from "../middlewares/auth";

const router = express.Router();

router.get("/profile-details", auth, getProfileDetails);
router.post("/update-profile", auth, updateProfile);
router.delete("/delete-account", auth, deleteAccount);

router.get("/admin-dashboard", auth, admin, getAdminDashboardDetails);
router.get("/instructor-dashboard", auth, instructor, getInstructorDashboard);

export default router;
