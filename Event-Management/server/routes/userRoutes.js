const userController = require('../controllers/userController');
const userRouter = require('express').Router();
const upload = require('../middlewares/uploadImages');

const authenticateUser = require('../middlewares/authentication');

userRouter.post('/auth/register', userController.registerUser);

userRouter.post('/auth/login', userController.loginUser);

userRouter.use(authenticateUser);

userRouter.put('/profile/', upload.single("avatar"), userController.updateProfile);

userRouter.get('/profile/', userController.getOwnUserProfile);

userRouter.get('/getEvents', userController.getUserEvents);

module.exports = userRouter;