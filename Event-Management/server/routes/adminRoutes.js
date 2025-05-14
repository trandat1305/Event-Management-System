const userController = require('../controllers/userController');
const adminRouter = require('express').Router();
const upload = require('../middlewares/uploadImages');

const authenticateAdmin = require('../middlewares/authAdmin');

adminRouter.post('/createAdmin', userController.registerAdmin); // DELETE THIS LATER

adminRouter.use(authenticateAdmin);

adminRouter.get('/allUsers', userController.getAllUsers);

adminRouter.get('/allUsersWithDeleted', userController.getAllUsersIncludingDeleted);

adminRouter.get('/profile/:userId', userController.getUserProfileById);

adminRouter.put('/updateUser/:userId', userController.updateUserById);

adminRouter.delete('/deleteUser/:userId', userController.deleteUserById);

module.exports = adminRouter;


