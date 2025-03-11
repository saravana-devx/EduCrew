import "./App.css";

import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import RegisterUserForm from "./components/auth/RegisterUser/RegisterUserForm";
import Login from "./components/auth/login/LoginForm";
import OpenGmail from "./components/auth/OpenGmail";
import VerifyEmail from "./components/auth/RegisterUser/VerifyEmail";

import EmailSent from "./components/auth/ResetPassword/EmailSent";
import ResetForm from "./components/auth/ResetPassword/ResetFrom";
import ChangePassword from "./components/auth/ResetPassword/ChangePassword";

import About from "./pages/About";
import ContactPage from "./pages/Contact";

import Navbar from "./components/common/headerFooter/Header";
import Footer from "./components/common/headerFooter/Footer";

import Home from "./pages/Home";
import SearchResultPage from "./pages/course/SearchResults";

import StudentDashboard from "./pages/dashboard/StudentDashboard";
import InstructorDashboard from "./pages/dashboard/InstructorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentUnsuccess from "./pages/payment/PaymentUnsuccess";

import Profile from "./pages/profile/ProfileDetail";
import EditProfile from "./pages/profile/EditProfile";

import Courses from "./pages/course/Courses";
import CourseCreationPage from "./pages/course/CourseCreation";
import ViewCourseVideos from "./components/course/CourseDetails/ViewCourseVideos";
import CourseEditionPage from "./pages/course/CourseEdition";
import CourseDetails from "./pages/course/CourseDetails";

import { PageNotFoundError } from "./components/common/error/ErrorPage";

import { useAppDispatch, useAppSelector } from "./hooks/redux.hook";

import {
  loggedInStatus,
  setLoggedIn,
  setUserDataNull,
} from "./redux/slices/userSlice";

import { SomethingWentWrong } from "./components/common/error/SomethingWentWrong";

interface DecodedToken {
  exp: number;
}

function App() {
  const token = localStorage.getItem("token");
  const isLoggedIn = useAppSelector(loggedInStatus);
  let exp = 0;

  if (token) {
    try {
      const decodedData = jwtDecode<DecodedToken>(token);
      exp = decodedData.exp;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (exp > 0) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > exp) {
        dispatch(setLoggedIn(false));
        dispatch(setUserDataNull());
        localStorage.removeItem("persist:user");
        localStorage.clear();
        navigate("/");
        dispatch({ type: "RESET" });
      }
    }
  }, [exp, dispatch, navigate]);

  return (
    <div className="w-full h-full bg-white overflow-x-hidden">
      <Navbar />
      <Routes>
        {/* OPEN ROUTES */}
        <Route path="/" element={<Home />} />
        {!isLoggedIn ? (
          <>
            <Route path="/register-user" element={<RegisterUserForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/open-gmail" element={<OpenGmail />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forget-password" element={<EmailSent />} />
        <Route path="/reset-password" element={<ResetForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/course/:courseId/:slug" element={<CourseDetails />} />
        <Route path="courseVideos/:slug" element={<ViewCourseVideos />} />
        {/* STUDENT ROUTES */}
        <Route path="/" element={<ProtectedRoute requiredRole="Student" />}>
          <Route path="/my-courses" element={<StudentDashboard />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-unsuccess" element={<PaymentUnsuccess />} />
        </Route>

        {/* INSTRUCTOR ROUTES */}
        <Route path="/" element={<ProtectedRoute requiredRole="Instructor" />}>
          <Route
            path="/instructor/dashboard"
            element={<InstructorDashboard />}
          />
          <Route path="/create-course" element={<CourseCreationPage />} />
          <Route
            path="/edit-course/:courseId"
            element={<CourseEditionPage />}
          />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/" element={<ProtectedRoute requiredRole="Admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* COURSE VIDEOS */}
        <Route path="/course-videos/:slug" element={<ViewCourseVideos />} />

        {/* Error Page */}
        <Route path="/error" element={<SomethingWentWrong />} />
        {/* PAGE NOT FOUND */}
        <Route path="/*" element={<PageNotFoundError />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
