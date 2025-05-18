const { body } = require('express-validator');

exports.createEventValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .escape(),
  body('description')
    .optional()
    .trim()
    .escape(),
  body('isPublic')
    .optional()
    .isBoolean().withMessage('isPublic must be a boolean'),
  body('location')
    .trim()
    .notEmpty().withMessage('Location is required')
    .escape(),
  body('startTime')
    .notEmpty().withMessage('Start time is required')
    .isISO8601().withMessage('Start time must be a valid date'),
  body('endTime')
    .notEmpty().withMessage('End time is required')
    .isISO8601().withMessage('End time must be a valid date'),
];

exports.updateEventValidator = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty')
    .escape(),
  body('description')
    .optional()
    .trim()
    .escape(),
  body('isPublic')
    .optional()
    .isBoolean().withMessage('isPublic must be a boolean'),
  body('location')
    .optional()
    .trim()
    .escape(),
  body('startTime')
    .optional()
    .isISO8601().withMessage('Start time must be a valid date'),
  body('endTime')
    .optional()
    .isISO8601().withMessage('End time must be a valid date'),
  body('status')
    .optional()
    .isIn(['active', 'cancelled', 'finished']).withMessage('Invalid status'),
];