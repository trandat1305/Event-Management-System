const userController = require('../controllers/userController');
const userRouter = require('express').Router();
const upload = require('../middlewares/uploadImages');

const authenticateAdmin = require('../middlewares/authAdmin');

userRouter.use(authenticateAdmin); // Protect all routes below this line

// userRouter.get('/allUsers', userController.getAllUsers);
