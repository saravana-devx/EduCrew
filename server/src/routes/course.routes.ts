import { Router } from "express";

import upload from "../middlewares/multer";
import { admin, auth, instructor, student } from "../middlewares/auth";

import {
  createCourse,
  editCourse,
  getAllCourses,
  getCourseById,
  getCourseByUser,
  updateCourseStatus,
  deleteCourseByAdmin,
  deleteCourseByInstructor,
  getCourses,
} from "../controllers/course/course.controller";

import {
  getTopCourses,
  getCourseByCategory,
  getSearchResults,
} from "../controllers/course/courseQuery.controller";

import {
  getCourseProgress,
  updateCourseProgress,
} from "../controllers/course/courseProgress.controller";

import {
  addSection,
  deleteSection,
  updateSection,
} from "../controllers/course/section/section.controller";

import {
  addSubSection,
  updateSubSection,
  deleteSubSection,
} from "../controllers/course/section/subSection.controller";
import Course from "../model/course";

const router = Router();

router.post(
  "/create-course",
  upload.single("image"),
  auth,
  instructor,
  createCourse
);
router.patch(
  "/edit-course/:courseId",
  upload.single("image"),
  auth,
  instructor,
  editCourse
);

router.patch(
  "/update-course-status/:courseId",
  auth,
  instructor,
  updateCourseStatus
);

router.post(
  "/delete-course-by-instructor/:courseId",
  auth,
  instructor,
  deleteCourseByInstructor
);

router.post(
  "/delete-course-by-admin/:courseId",
  auth,
  admin,
  deleteCourseByAdmin
);

router.get("/top-courses", getTopCourses);
router.get("/get-all-courses", getAllCourses);
router.get("/category/:category", getCourseByCategory);
router.get("/search/:searchQuery", getSearchResults);
router.get("/:id", getCourseById);

router.get("/get-course-progress", auth, student, getCourseProgress);
router.patch(
  "/update-course-progress/:courseId/:subSectionId",
  auth,
  student,
  updateCourseProgress
);

router.get("/enrolled-courses", auth, student, getCourseByUser);

// ++++++++++++++++++++++++++++++++++++++++++++++++++
//                   Section Route
// ++++++++++++++++++++++++++++++++++++++++++++++++++

router.post("/add-section/:courseId", addSection);
router.patch("/update-section/:courseId/:sectionId", updateSection);
router.post("/delete-section/:courseId/:sectionId", deleteSection);

// ++++++++++++++++++++++++++++++++++++++++++++++++++
//                   Sub - Section Route
// ++++++++++++++++++++++++++++++++++++++++++++++++++

router.post(
  "/add-subSection/:sectionId",
  upload.single("video"),
  addSubSection
);
router.patch(
  "/update-subSection/:sectionId/:subSectionId",
  upload.single("video"),
  updateSubSection
);
router.post("/delete-subSection/:sectionId/:subSectionId", deleteSubSection);

router.get("/api/get-courses", getCourses);

router.get("/api/get-earnings-by-month", async (req, res) => {
  try {
    const earningsByMonth = await Course.aggregate([
      {
        $match: { status: "Published" },
      },
      {
        $project: {
          courseName: 1,
          price: 1,
          studentCount: { $size: "$studentEnrolled" },
          createdAtMonth: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" },
          },
          earnings: { $multiply: [{ $size: "$studentEnrolled" }, "$price"] },
        },
      },
      {
        $group: {
          _id: "$createdAtMonth", // Group by month (year-month)
          totalEarnings: { $sum: "$earnings" }, // Sum the earnings for each month
        },
      },
      {
        $sort: { _id: 1 }, // Sort by the month (ascending)
      },
    ]);

    res.json(earningsByMonth);
  } catch (error) {
    console.error("Error fetching earnings by month:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// API Route 2: Get Earnings by Course
router.get("/api/get-earnings-by-course", async (req, res) => {
  try {
    const earningsByCourse = await Course.aggregate([
      {
        $match: { status: "Published" },
      },
      {
        $project: {
          courseName: 1,
          price: 1,
          studentCount: { $size: "$studentEnrolled" },
          earnings: { $multiply: [{ $size: "$studentEnrolled" }, "$price"] },
        },
      },
      {
        $sort: { earnings: -1 }, // Sort by earnings in descending order
      },
    ]);

    res.json(earningsByCourse);
  } catch (error) {
    console.error("Error fetching earnings by course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
