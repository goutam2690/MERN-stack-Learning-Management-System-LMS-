import Course from "../models/course.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getAllCourses = async (req, res, next) => {
  // res.set('Cache-Control', 'no-store');
  const courses = await Course.find({}).select("-lectures");

  res.status(200).json({
    success: true,
    message: "All Courses loaded successfully",
    courses,
  });
};

const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Invalid Course Id", 400));
    }

    res.status(200).json({
      success: true,
      message: "Course Lectures Fetched Successfully",
      lectures: course.lectures,
    });
  } catch (e) {
    return next(new AppError("No such course found!", 404));
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new AppError("All Fields Are Required", 400));
    }

    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: "dummy",
        secure_url: "dummy",
      },
    });

    if (!course) {
      return next(new AppError("Course could not created, please try again"));
    }

    if (req.file) {
      console.log(req.file);
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "Server",
      });
      console.log(JSON.stringify(result));
      if (result) {
        // update the image url in database
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }

      fs.unlink(`../uploads/${req.file.filename}`, () => {
        console.log("");
      });
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: "true",
      }
    );

    if (!course) {
      return next(new AppError("Course with given id doesn't exixts", 500));
    }

    res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return next(new AppError("Course not deleted, Please try again "));
    }

    res.status(200).json({
      success: true,
      message: "Course Deleted successful",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// const addLecturesToCourseById = async (req, res, next) => {
//   try {
//     const { title, description } = req.body;
//     const { id } = req.params;

//     if (!title || !description) {
//       return next(new AppError("All Fields Are Required"));
//     }

//     const course = await Course.findById(id);

//     if (!course) {
//       return next(new AppError("Course with given id doess not exists"));
//     }

//     const lectureData = {
//       title,
//       description,
//       lecture: {},
//     };

//     if (req.file) {
//       try {
//         const result = await cloudinary.v2.uploader.upload(req.file.path, {
//           resource_type: "video",
//           folder: "Server",
//         });
//         console.log(JSON.stringify(result));
//         if (result) {
//           // update the image url in database
//           lectureData.lecture.public_id = result.public_id;
//           lectureData.lecture.secure_url = result.secure_url;
//         }

//         fs.unlink(`../uploads/${req.file.filename}`, () => {
//           console.log("");
//         });
//       } catch (error) {
//         return next(new AppError(error.message, 500));
//       }
//     }

//     course.lectures.push(lectureData);

//     course.numberOfLectures = course.lectures.length;

//     await course.save();

//     res.status(200).json({
//       success: true,
//       message: "Lectures Successfully Added to the Course",
//       course,
//     });
//   } catch (error) {
//     return next(new AppError(error.message));
//   }
// };

const addLecturesToCourseById = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title || !description) {
      return next(new AppError("All Fields Are Required"));
    }

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Course with given id does not exist"));
    }

    const lectureData = {
      title,
      description,
      lecture: {}, // Initialize the lecture object
    };

    if (req.file) {
      try {
        // Upload video to Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          resource_type: "video",
          folder: "Server",
          format: "mp4",
        }).catch(error => {
          console.error("Cloudinary upload error:", error);
          throw new Error("Failed to upload video to Cloudinary");
        });;

        console.log(JSON.stringify(result));

        if (result) {
          // Update the lectureData with Cloudinary details
          lectureData.lecture.public_id = result.public_id;
          lectureData.lecture.secure_url = result.secure_url;
        }

        // Remove the local file after upload
        fs.unlink(req.file.path, () => {
          console.log("Local file removed");
        });
      } catch (error) {
        console.log(error)
        return next(new AppError(error.message, 500));
      }
    }

    // Push the lectureData to the course's lectures array
    course.lectures.push(lectureData);

    // Update the number of lectures in the course
    course.numberOfLectures = course.lectures.length;

    // Save the course with the new lecture
    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture Successfully Added to the Course",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message));
  }
};

// const deleteLecture = async (req, res, next) => {
//   const { courseId, lectureId } = req.query;

//   if (!courseId) {
//     return next(new AppError("courseId is required, Please Try Again"));
//   }
//   if (!lectureId) {
//     return next(new AppError("lectureId is required, Please Try Again"));
//   }

//   const course = await Course.findById(courseId);

//   if (!course) {
//     return next(new AppError("No Course Found With This Id", 404));
//   }

//   let index = course.lectures.indexOf(lectureId);

//   if (index === -1) {
//     return next(
//       new AppError("No Lecture Found with this id in this course ", 404)
//     );
//   }

//   //remove from array
//   course.lectures.splice(index, 1);
//   course.numberOfLectures = course.numberOfLectures - 1;

//   await course.save();

//   res.status(204).json({
//     success: true,
//     message: "Lecture successfully deleted from the course",
//     data: { course },
//   });
// };
// const deleteLecture = async (req, res, next) => {
//   try {
//     const { courseId, lectureId } = req.query;
//     console.log("req-query : ", req.query);
//     if (!courseId || !lectureId) {
//       return next(
//         new AppError(
//           "Both courseId and lectureId are required. Please try again.",
//           400
//         )
//       );
//     }

//     const course = await Course.findById(courseId);

//     if (!course) {
//       return next(new AppError("No Course Found With This Id", 404));
//     }

//     const lectureIndex = course.lectures.findIndex(
//       (lecture) => lecture._id.toString() === lectureId
//     );

//     if (lectureIndex === -1) {
//       return next(
//         new AppError("No Lecture Found with this id in this course", 404)
//       );
//     }

//     // Remove from array
//     course.lectures.splice(lectureIndex, 1);
//     course.numberOfLectures = course.numberOfLectures - 1;

//     await course.save();

//     res.status(204).json({
//       success: true,
//       message: "Lecture successfully deleted from the course",
//       data: { course },
//     });
//   } catch (error) {
//     console.log(error);
//     toast.error(error?.message);
//   }
// };
const deleteLecture = async (req, res, next) => {
  const { courseId, lectureId } = req.query;

  if (!courseId || !lectureId) {
    return next(new AppError("Both courseId and lectureId are required. Please try again.", 400));
  }

  try {
    // Convert ObjectId strings to ObjectId type
    const course = await Course.findById(courseId);
    const lectureIndex = course.lectures.findIndex(lecture => lecture._id.toString() === lectureId);

    if (lectureIndex === -1) {
      return next(new AppError("No Lecture Found with this id in this course", 404));
    }

    // Remove from array
    course.lectures.splice(lectureIndex, 1);
    course.numberOfLectures = course.numberOfLectures - 1;

    await course.save();

    res.status(204).json({
      success: true,
      message: "Lecture successfully deleted from the course",
      data: { course },
    });
  } catch (error) {
    return next(new AppError("Error deleting lecture", 500));
  }
};


export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  deleteCourse,
  addLecturesToCourseById,
  deleteLecture,
};
