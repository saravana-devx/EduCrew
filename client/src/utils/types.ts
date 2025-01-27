export interface UserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: "Student" | "Instructor" | "Admin";
  image?: File | string;
  additionalDetails?: additionalDetails;
  courses?: [];
  enrolledCourses?: string[];
  isActive: boolean;
}

// export interface Student extends UserDetails {
//   enrolledCourses: string[];
// }

// export interface Instructor extends UserDetails {
//   courses: string[];
// }

export interface additionalDetails {
  gender: string;
  dob: string;
  about: string;
  contactNumber: string;
}

export interface Course {
  _id: string;
  courseName: string;
  description: string;
  instructor: UserDetails;
  thumbnail: File | string | null;
  price: number;
  whatYouWillLearn: string[];
  content: Section[];
  category: string;
  studentEnrolled?: [];
  ratingAndReview: ratingAndReview[];
  status: "Published" | "Draft";
  createdAt: string;
  updatedAt: string;
}


export interface Section {
  _id: string;
  sectionName: string;
  subSection: SubSection[];
}

export interface SubSection {
  _id: string;
  sectionId: string;
  title: string;
  description: string;
  video: File | string | null;
}

export type CourseProgress = {
  courseId: string;
  completedVideos: string[];
  totalVideos?: number;
};

export type ratingAndReview = {
  _id?: string;
  review: string;
  rating: number;
  user: {
    _id?: string;
    firstName: string;
    lastName: string;
    image: string;
  };
};

export interface CourseState {
  courses: Course[];
  singleCourse: Course | null;
  searchResults: Course[];
  loading: boolean;
}

export interface Query {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  message: string;
  createdAt: Date;
  // status: "Resolved" | "Pending";
}
