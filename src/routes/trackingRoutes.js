const express = require('express');
const { addTrackingData } = require('../controllers/trackingController');

const router = express.Router();

router.post('/data', addTrackingData);

module.exports = router;
