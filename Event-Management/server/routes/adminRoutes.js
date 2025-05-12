const userController = require('../controllers/userController');
const adminRouter = require('express').Router();
const upload = require('../middlewares/uploadImages');

const authenticateAdmin = require('../middlewares/authAdmin');

//route: /admin/createAdmin
// Create a new admin
adminRouter.post('/createAdmin', userController.registerAdmin);

adminRouter.use(authenticateAdmin); // Protect all routes below this line

//route /admin/getAllUsers
// Get all users excluding soft-deleted ones
adminRouter.get('/allUsers', userController.getAllUsers);

//route: /admin/getAllUsersIncludingDeleted
// Get all users including soft-deleted ones
adminRouter.get('/allUsersIncludingDeleted', userController.getAllUsersIncludingDeleted);

//route: /admin/updateAvatar/:id
// Update user 
adminRouter.get('/updateUser/:id', userController.updateUserById);

//route: /admin/deleteUser/:id
// Soft delete user
adminRouter.delete('/deleteUser/:id', userController.deleteUserById);

module.exports = adminRouter;


