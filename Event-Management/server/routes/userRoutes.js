const userController = require('../controllers/userController');
const userRouter = require('express').Router();


//router: user/auth/register
userRouter.post('/auth/register', userController.registerUser);

//router: user/auth/login
userRouter.post('/auth/login', userController.loginUser);

module.exports = userRouter;