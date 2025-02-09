import express from "express";

import {
  getAdminDashboardDetails,
  getInstructorDashboard,
  getProfileDetails,
  updateProfile,
  deleteAccount,
  getCoursesInfoForAdmin,
  getUsersInfoForAdmin,
} from "../controllers/profile/profile.controller";

import { admin, auth, instructor } from "../middlewares/auth";
import User from "../model/User";
import Course from "../model/course";

const router = express.Router();

router.get("/profile-details", auth, getProfileDetails);
router.post("/update-profile", auth, updateProfile);
router.delete("/delete-account", auth, deleteAccount);

router.get("/instructor-dashboard", auth, instructor, getInstructorDashboard);

router.get("/getCoursesInfoForAdmin", auth, admin, getCoursesInfoForAdmin);
router.get("/getUsersInfoForAdmin", auth, admin, getUsersInfoForAdmin);
router.get("/get-total-student-instructor", async (req, res) => {
  const info = await User.aggregate([
    {
      $match: {
        accountType: {
          $in: ["Student", "Instructor"],
        },
      },
    },
    {
      $group: {
        _id: "$accountType",
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  res.json(info);
});
router.get("/get-most-enrolled-courses", async (req, res) => {
  const info = await Course.aggregate([
    {
      $project: {
        courseName: 1,
        totalStudents: {
          $size: "$studentEnrolled",
        },
      },
    },
    {
      $sort: {
        totalStudents: -1,
      },
    },
    {
      $limit: 10,
    },
  ]);
  res.json(info);
});

router.get("/admin-dashboard", auth, admin, getAdminDashboardDetails);

export default router;
