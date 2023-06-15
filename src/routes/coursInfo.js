const cr = require("express").Router();
const coursesData = require("../Data/Courses.json");
const Validator = require("../helpers/Validator");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

cr.use(bodyParser.urlencoded({ extended: false }));
cr.use(bodyParser.json());

cr.get("/", (_, res) => {
  const sainadhCourses = coursesData.courses;
  res.status(200);
  res.send(sainadhCourses);
});

cr.get("/:courseid", (req, res) => {
  try {
    const sainadhCourses = coursesData.courses;
    const courseParam = Number(req.params.courseid);
    console.log(courseParam);

    const filteresCourse = sainadhCourses.filter(
      (course) => Number(course.courseid) === courseParam
    );
    if (filteresCourse.length > 0) {
      res.status(200);
      res.send(filteresCourse[0]);
    } else {
      res.status(200);
      res.send("no courses found with passed course id");
    }
  } catch (error) {
    res.status(400);
    res.send(error, "error at get request");
  }
});

cr.get("/:courseid/mentor", (req, res) => {
  try {
    const sainadhCourses = coursesData.courses;
    const courseParam = Number(req.params.courseid);
    console.log(courseParam);

    const filteresCourse = sainadhCourses.find(
      (course) => Number(course.courseid) === courseParam
    );
    if (filteresCourse) {
      res.status(200);
      res.send(filteresCourse.mentor);
    } else {
      res.status(200);
      res.send({ res: filteresCourse, msg: "not found" });
    }
  } catch (error) {
    res.status(400);
    res.send(error, "error at get request");
  }
});

cr.post("/", (req, res) => {
  const courseDetails = req.body;
  const writePath = path.join(__dirname, "../Data/", "Courses.json");
  if (Validator.validateCourseInfo(courseDetails, coursesData.courses).status) {
    const updatesCourses = coursesData;
    updatesCourses.courses = [...coursesData.courses, courseDetails];
    fs.writeFile(writePath, JSON.stringify(updatesCourses), (err) => {
      if (err) {
        console.log("write file failed!", err);
      } else {
        console.log("write file success");
      }
    });
    res.status(200);
    res.send(courseDetails);
  } else {
    res.status(201);
    res.send({ error: "insert failed" });
  }
});

cr.post("/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  const courseDetails = req.body;
  const writePath = path.join(__dirname, "../Data/", "Courses.json");
  const flag = Validator.updateValidateCourseInfo(
    courseDetails,
    coursesData.courses,
    courseId
  );
  if (flag.status) {
    const updatesCourses = coursesData;
    updatesCourses.courses = updatesCourses.courses.map((course) => {
      if (courseId == course.courseid) {
        return {
          ...course,
          ...courseDetails,
        };
      } else {
        return course;
      }
    });
    fs.writeFile(writePath, JSON.stringify(updatesCourses), (err) => {
      if (err) {
        console.log("write file failed!", err);
      } else {
        console.log("write file success");
      }
    });
    res.status(200);
    res.send(coursesData.courses.find((item) => item.courseid == courseId));
  } else {
    res.status(201);
    res.send({ error: "update failed " + flag.message });
  }
});

cr.delete("/:courseid", (req, res) => {
  const courseId = Number(req.params.courseid);
  const writePath = path.join(__dirname, "../Data/", "Courses.json");
  if (Validator.deleteValidator(coursesData.courses, courseId)) {
    const updatesCourses = coursesData;
    updatesCourses.courses = coursesData.courses.filter(
      (course) => course.courseid != courseId
    );
    fs.writeFile(writePath, JSON.stringify(updatesCourses), (err) => {
      if (err) {
        console.log("write file failed!", err);
      } else {
        console.log("write file success");
      }
    });
    res.status(200);
    res.send(updatesCourses);
  } else {
    res.status(200);
    res.send("no courses found with passed course id");
  }
});

module.exports = cr;
