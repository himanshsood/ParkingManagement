const express = require('express');
const { getSlots, bookSlot } = require('../controllers/parkingController');
const validateVehicleType = require('../middlewares/validateVehicleType');

const router = express.Router();

// Routes
router.get('/slots', getSlots);
router.post('/slots/:index', validateVehicleType, bookSlot);

module.exports = router;
