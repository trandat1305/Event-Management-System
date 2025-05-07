const userController = require('../controllers/userController');
const userRouter = require('express').Router();
const upload = require('../middlewares/uploadImages');

const authenticateUser = require('../middlewares/authMiddleware');


//router: user/auth/register
userRouter.post('/auth/register', userController.registerUser);

//router: user/auth/login
userRouter.post('/auth/login', userController.loginUser);

userRouter.use(authenticateUser); // Protect all routes below this line

userRouter.put('/updateAvatar', upload.single("avatar"), userController.updateAvatar);

userRouter.get('/auth/secret', (req, res) => {
  try {
    res.status(200).json({ message: 'This is a secret route', user: req.user });
  }
  catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = userRouter;