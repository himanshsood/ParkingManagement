const express = require('express');
const { getSlots, bookSlot, releaseSlot } = require('../controllers/parkingController');
const validateVehicleType = require('../middlewares/validateVehicleType');

const router = express.Router();

// Route to get all slots
router.get('/slots', getSlots);

// Route to book a slot
router.post('/slots/:index', validateVehicleType, bookSlot);

// Route to release a slot
router.delete('/slots/:index', releaseSlot);

module.exports = router;
