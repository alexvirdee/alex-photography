const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Photograph = require('../models/Photograph');

// @desc      Get all photographs
// @route     GET /
// @access    Public
exports.getPhotographs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
