import { Router } from "express";
import {
  addLecturesToCourseById,
  createCourse,
  deleteCourse,
  // deleteLecture,
  getAllCourses,
  getLecturesByCourseId,
  updateCourse,
  deleteLecture
} from "../controllers/course.controller.js";
import { authorizedRoles, authorizedSubscriber, isAuthenticated } from "../middlewares/auth.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(isAuthenticated, authorizedRoles('ADMIN'), upload.single("thumbnail"), createCourse);

router
  .route("/:id")
  .get(isAuthenticated, getLecturesByCourseId)
  .put(isAuthenticated, authorizedRoles('ADMIN'), updateCourse)
  .delete(isAuthenticated, authorizedRoles('ADMIN'), deleteCourse)
  .post(isAuthenticated, authorizedRoles('ADMIN'), upload.single("lecture"), addLecturesToCourseById)
  .delete(isAuthenticated, authorizedRoles('ADMIN'), deleteLecture)

export default router;
