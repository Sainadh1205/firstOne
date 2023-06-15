class Validator {
  static validateCourseInfo(courseInfo, courseData) {
    if (
      courseInfo["courseid"] !== undefined &&
      courseInfo["name"] !== undefined &&
      courseInfo["duration"] !== undefined &&
      courseInfo["mentor"] !== undefined
    ) {
      if (this.validateUniqueCourseId(courseData.courseid, courseData)) {
        return {
          status: false,
          message: "course id must be unique",
        };
      }
      return {
        status: true,
        message: "Course has been successfully added",
      };
    }

    return {
      status: false,
      message: "Course Info is malformed please provide all the properties",
    };
  }

  static updateValidateCourseInfo(courseInfo, courseData, courseId) {
    const course = courseData.find((item) => item.courseid === courseId);
    console.log(course);
    if (course) {
      for (const key in courseInfo) {
        if (!course[key]) {
          return {
            status: false,
            message: "key not found",
          };
        }
      }
      return {
        status: true,
        message: "insert success",
      };
    } else {
      return {
        status: false,
        message: "course id not found",
      };
    }
  }

  static deleteValidator(courseData, courseId) {
    const course = courseData.find((item) => item.courseid === courseId);
    if (course) {
      return {
        status: true,
        message: "insert success",
      };
    } else {
      return {
        status: false,
        message: "course id not found",
      };
    }
  }

  static validateUniqueCourseId(courseId, courseData) {
    const findCourseId = courseData.find(
      (course) => course.courseId === courseId
    );

    if (findCourseId) {
      return false;
    }
    return true;
  }
}

module.exports = Validator;
