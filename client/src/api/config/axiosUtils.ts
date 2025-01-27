export const getHeaders = () => {
  const token = localStorage.getItem("token") || "";
  return {
    Authorization: `Bearer ${token}`,
  };
};

// ----------------------------------------------------------
// ----------------------Base Route URL's -------------------
// ----------------------------------------------------------

export const AuthURL = {
  registerUser: "/auth/register-user",
  loginUser: "/auth/login-user",
  confirmEmail: "/auth/verify-email",
  changePassword: "/auth/change-password",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  toggleUserActiveStatus: "/auth/toggle-status",
};

export const ProfileURL = {
  profileDetails: "/profile/profile-details",
  updateProfile: "/profile/update-profile",
  deleteAccount: "/profile/delete-count",
  getInstructorDashboardData: "/profile/instructor-dashboard",
  getAdminDashboardData: "/profile/admin-dashboard",
};

export const CourseURL = {
  createCourse: "/course/create-course",
  editCourse: "/course/edit-course",
  updateCourseStatus: "/course/update-course-status",
  deleteCourseByInstructor: "/course/delete-course-by-instructor",
  deleteCourseByAdmin: "/course/delete-course-by-admin",

  getTopCourses: "/course/top-courses",
  getAllCourses: "/course/get-all-courses",
  getCourseByCategory: "/course/category",
  getSearchResult: "/course/search",
  getCourseById: "/course",

  getCourseByProgress: "/course/get-course-progress",
  updateCourseProgress: "/course/update-course-progress",

  getEnrolledCourses: "/course/enrolled-courses",
};

export const SectionURL = {
  addSection: "/course/add-section",
  updateSection: "/course/update-section",
  deleteSection: "/course/delete-section",
};

export const SubSectionURL = {
  addSubSection: "/course/add-subSection",
  updateSubSection: "/course/update-subSection",
  deleteSubSection: "/course/delete-subSection",
};

export const paymentUrl = {
  createCheckOutSession: "/payment/create-checkout-session",
  purchaseCourse: "/payment-course",
};

export const RatingURL = {
  createRatingAndReview: "/rating/add-rating",
  getAverageRating: "/rating/average-rating",
  getAllRatingByCourse: "/rating/get-rating-by-course",
};

export const ContactURL = {
  postQuery: "/contact/send-query",
  deleteQuery: "/delete-query",
};
