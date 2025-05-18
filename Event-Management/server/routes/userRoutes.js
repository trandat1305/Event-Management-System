const userController = require('../controllers/userController');
const notificationController = require('../controllers/notificationController');

const userRouter = require('express').Router();
const upload = require('../middlewares/uploadImages');

const { registerValidator, loginValidator, updateProfileValidator } = require('../middlewares/userValidator');
const { validationResult } = require('express-validator');

const authenticateUser = require('../middlewares/authentication');

// Register route with validation
userRouter.post(
  '/auth/register',
  registerValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  userController.registerUser
);

// Login route with validation
userRouter.post(
  '/auth/login',
  loginValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  userController.loginUser
);

userRouter.use(authenticateUser);

// Profile related routes
userRouter.get('/profile/', userController.getProfile);

userRouter.get('/profile/:userId', userController.getUserProfileById);

userRouter.put('/profile/', upload.single("avatar"), updateProfileValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  userController.updateProfile
);

// Notification related routes
userRouter.get('/notifications', notificationController.getNotification); // get all notifications of a user

userRouter.delete('/notifications/:notificationId', notificationController.deleteNotification); // delete a notification

userRouter.delete('/notifications/all', notificationController.deleteAllNotifications); // delete all notifications

// Event related routes
userRouter.get('/events/attending', userController.getUserEvents); // get all events that a person is attending

userRouter.get('/events/organizing', userController.getUserOrganizedEvents); // get all events that a person is organizing

userRouter.get('/events/created', userController.getUserCreatedEvents); // get all events that a person has made

module.exports = userRouter;