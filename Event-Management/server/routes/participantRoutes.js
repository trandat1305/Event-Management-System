const router = require('express').Router();
const participantController = require('../controllers/participantController');

const authenticateUser = require('../middlewares/authentication');

router.use(authenticateUser); // Protect all routes below this line

router.post('/joinEvent/:id', participantController.joinEvent);