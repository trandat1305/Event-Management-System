const userController = require('../controllers/userController');
const notificationController = require('../controllers/notificationController');

const userRouter = require('express').Router();
const upload = require('../middlewares/uploadImages');

const authenticateUser = require('../middlewares/authentication');

userRouter.post('/auth/register', userController.registerUser);

userRouter.post('/auth/login', userController.loginUser);

userRouter.use(authenticateUser);

// Profile related routes
userRouter.get('/profile/', userController.getProfile);

userRouter.get('/profile/:userId', userController.getUserProfileById);

userRouter.put('/profile/', upload.single("avatar"), userController.updateProfile);

// Notification related routes
userRouter.get('/notifications', notificationController.getNotification); // get all notifications of a user

userRouter.delete('/notifications/:notificationId', notificationController.deleteNotification) // delete a notification

userRouter.delete('/notifications/all', notificationController.deleteAllNotifications) // delete all notifications

// Event related routes
userRouter.get('/events', userController.getUserEvents); // get all events that a person is attending

userRouter.get('/organizedEvents', userController.getUserOrganizedEvents); // get all events that a person is organizing

userRouter.get('/createdEvents', userController.getUserCreatedEvents); // get all events that a person has made

module.exports = userRouter;