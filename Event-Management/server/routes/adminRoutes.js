const userController = require('../controllers/userController');
const adminRouter = require('express').Router();
const { updateProfileValidator } = require('../middlewares/userValidator');
const { validationResult } = require('express-validator');
const authenticateAdmin = require('../middlewares/authAdmin');

adminRouter.post('/createAdmin', userController.registerAdmin); // DELETE THIS LATER

adminRouter.use(authenticateAdmin);

adminRouter.get('/allUsers', userController.getAllUsers);

adminRouter.get('/allUsersWithDeleted', userController.getAllUsersIncludingDeleted);

adminRouter.put('/users/update/:userId', updateProfileValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  userController.updateUserById
);

adminRouter.delete('/users/delete/:userId', userController.deleteUserById);

// add more admin functions later

module.exports = adminRouter;


