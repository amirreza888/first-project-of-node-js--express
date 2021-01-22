const express = require('express');
const router = express.Router();

//middlewares
const apiAuth = require('./middleware/apiAuth');
const {uploadImage} = require('./middleware/UploadMiddleware');

//Controllers
const {api: ControllerApi} = config.path.controllers;
const HomeController = require(`${ControllerApi}/v1/HomeController`);
const CourseController = require(`${ControllerApi}/v1/CourseController`);
const AuthController = require(`${ControllerApi}/v1/AuthController`);
const UserController = require(`${ControllerApi}/v1/UserController`);

router.get('/', HomeController.index);
router.get('/course', CourseController.index.bind(CourseController))
router.get('/version', HomeController.version);
router.post('/login', AuthController.login.bind(AuthController));
router.post('/register', AuthController.register.bind(AuthController));
router.get('/user', apiAuth, UserController.index.bind(UserController));


router.post('/user/image', apiAuth, uploadImage.single('image'), UserController.upload.bind(UserController));


// AdminController
const AdminCourseController = require(`${ControllerApi}/v1/admin/CourseController`)
const AdminEpisodeController = require(`${ControllerApi}/v1/admin/EpisodeController`)


const adminRouter = express.Router()
adminRouter.get('/courses', AdminCourseController.index.bind(AdminCourseController));
adminRouter.get('/courses/:id', AdminCourseController.single);
adminRouter.post('/courses', AdminCourseController.store.bind(AdminCourseController));
adminRouter.put('/courses/:id', AdminCourseController.update);
adminRouter.delete('/courses/:id', AdminCourseController.destroy);

adminRouter.get('/episodes', AdminEpisodeController.index.bind(AdminEpisodeController));
adminRouter.get('/episodes/:id', AdminEpisodeController.single.bind(AdminEpisodeController));
adminRouter.post('/episodes', AdminEpisodeController.store.bind(AdminEpisodeController));
adminRouter.put('/episodes/:id', AdminEpisodeController.update.bind(AdminEpisodeController));
adminRouter.delete('/episodes/:id', AdminEpisodeController.destroy.bind(AdminEpisodeController));

router.use('/admin', adminRouter)
module.exports = router;