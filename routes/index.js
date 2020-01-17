const express = require('express');
const { getPhotographs } = require('../controllers/photographs');

const Photograph = require('../models/Photograph');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router.route('/').get(advancedResults(Photograph), getPhotographs);

module.exports = router;
