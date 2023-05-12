import { Router } from "express";
import lessonController from "./controllers/lessonController";
import chapterController from "./controllers/chapterController";
import courseController from "./controllers/courseController";
import subjectController from "./controllers/subjectController";
import resourceLessonController from "./controllers/resourceLessonController";
import videoLessonController from "./controllers/videoLessonController";
import textLessonController from "./controllers/textLessonController";
import employeeController from "./controllers/employeeController";
import customerController from "./controllers/customerController";
import employeeAuth from "../../middlewares/employeeAuth";
import uploadImg from "../../middlewares/uploadImg";
import uploadVideo from "../../middlewares/uploadVideo";

const employeeRouter = Router();

employeeRouter.get("/employee/subject/list/",employeeAuth,subjectController.list)
employeeRouter.get("/employee/subject/:id",employeeAuth,subjectController.get)
employeeRouter.put("/employee/subject/:id",employeeAuth,subjectController.put)
employeeRouter.post("/employee/subject/",employeeAuth,subjectController.post)
employeeRouter.delete("/employee/subject/:id",employeeAuth,subjectController.del)

employeeRouter.get("/employee/course/list/",employeeAuth,courseController.list)
employeeRouter.get("/employee/course/:id",employeeAuth,courseController.get)
employeeRouter.put("/employee/course/image/:id",employeeAuth,uploadImg,courseController.putImage)
employeeRouter.put("/employee/course/:id",employeeAuth,courseController.put)
employeeRouter.post("/employee/course/",employeeAuth,courseController.post)
employeeRouter.delete("/employee/course/:id",employeeAuth,courseController.del)


employeeRouter.get("/employee/chapter/list/:courseId",employeeAuth,chapterController.list)
employeeRouter.get("/employee/chapter/:id",employeeAuth,chapterController.get)
employeeRouter.put("/employee/chapter/:id",employeeAuth,chapterController.put)
employeeRouter.post("/employee/chapter/",employeeAuth,chapterController.post)
employeeRouter.delete("/employee/chapter/:id",employeeAuth,chapterController.del)

employeeRouter.get("/employee/lesson/list/:chapterId",employeeAuth,lessonController.list)
employeeRouter.get("/employee/lesson/:id",employeeAuth,lessonController.get)
employeeRouter.put("/employee/lesson/:id",employeeAuth,lessonController.put)
employeeRouter.post("/employee/lesson/",employeeAuth,lessonController.post)
employeeRouter.delete("/employee/lesson/:id",employeeAuth,lessonController.del)

employeeRouter.get("/employee/resourceLesson/:id",employeeAuth,resourceLessonController.get)
employeeRouter.put("/employee/resourceLesson/:id",employeeAuth,resourceLessonController.put)
employeeRouter.post("/employee/resourceLesson/",employeeAuth,resourceLessonController.post)
employeeRouter.delete("/employee/resourceLesson/:id",employeeAuth,resourceLessonController.del)

employeeRouter.get("/employee/videoLesson/:id",employeeAuth,videoLessonController.get)
employeeRouter.put("/employee/videoLesson/video/:id",employeeAuth,uploadVideo,videoLessonController.putVideo)
employeeRouter.put("/employee/videoLesson/:id",employeeAuth,videoLessonController.put)
employeeRouter.post("/employee/videoLesson/",employeeAuth,videoLessonController.post)
employeeRouter.delete("/employee/videoLesson/:id",employeeAuth,videoLessonController.del)


employeeRouter.get("/employee/textLesson/:id",employeeAuth,textLessonController.get)
employeeRouter.put("/employee/textLesson/:id",employeeAuth,textLessonController.put)
employeeRouter.post("/employee/textLesson/",employeeAuth,textLessonController.post)
employeeRouter.delete("/employee/textLesson/:id",employeeAuth,textLessonController.del)


employeeRouter.get("/employee/list/",employeeAuth,employeeController.list)
employeeRouter.post("/employee/login",employeeController.login)
employeeRouter.post("/employee",employeeAuth,employeeController.post)
employeeRouter.get("/employee/:id",employeeAuth,employeeController.get)
employeeRouter.put("/employee/:id",employeeAuth,employeeController.put)


employeeRouter.get("/employee/customer/",employeeAuth,customerController.list)
employeeRouter.get("/employee/customer/:id",employeeAuth,customerController.get)
employeeRouter.put("/employee/customer/active/:id",employeeAuth,customerController.changeActiveStatus)

export default employeeRouter;