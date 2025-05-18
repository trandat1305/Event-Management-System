const { body } = require('express-validator');

exports.messageValidator = [
  body('message')
    .exists({ checkFalsy: true }).withMessage('Message is required')
    .isString().withMessage('Message must be a string')
    .isLength({ max: 1000 }).withMessage('Message cannot exceed 1000 characters')
    .trim()
    .escape()
];