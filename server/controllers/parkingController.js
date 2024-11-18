// Simulate database
let slots = Array(10).fill(null);

// Fetch all slots
const getSlots = (req, res) => {
    res.json(slots);
};

// Book a slot
const bookSlot = (req, res) => {
    const { index } = req.params;
    const { vehicleType } = req.body;

    if (slots[index]) {
        return res.status(400).json({ message: `Slot ${+index + 1} is already booked` });
    }

    slots[index] = vehicleType;
    res.json({ message: `Slot ${+index + 1} booked for a ${vehicleType}` });
};

module.exports = {
    getSlots,
    bookSlot,
};
