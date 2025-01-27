export interface additionalDetails {
  gender: string;
  dob: string;
  about: string;
  contactNumber: string;
}

export interface Module {
  _id: string;
  moduleName: string;
  subModule: SubModule[];
}

export interface SubModule {
  _id: string;
  moduleId: string;
  title: string;
  description: string;
  video: File | string | null;
}

export interface addSubModule extends SubModule {
  video: File;
}

export interface detailSubModule extends SubModule {
  video: string;
}

export interface ratingAndReview  {
  _id: string;
  review: string;
  rating: number;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
  };
};

export interface Query {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  message: string;
  createdAt: Date;
}

export interface UserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: "Student" | "Instructor" | "Admin";
  image?: File | string;
  additionalDetails?: additionalDetails;
  isActive: boolean;
}

export interface Student extends UserDetails {
  enrolledCourses: string[];
}

export interface Instructor extends UserDetails {
  courses: string[];
}

export interface Course {
  _id: string;
  courseName: string;
  description: string;
  price: number;
  whatYouWillLearn: string[];
  courseContent: Module[];
  category: string;
  status: "Published" | "Draft";
}

export interface CourseDetails extends Course {
  instructor: UserDetails;
  thumbnail: string;
}

export interface CourseCreation extends Course {
  instructor: string;
  thumbnail: File;
}

export interface CourseCreationState {
  activeCourse: Course | null;
  loading: boolean;
  step: number;
  isEdit: boolean;
}
