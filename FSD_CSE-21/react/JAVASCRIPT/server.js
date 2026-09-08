const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const bookingsFile = path.join(__dirname, 'bookings.json');

// Initialize bookings file if it doesn't exist
if (!fs.existsSync(bookingsFile)) {
    fs.writeFileSync(bookingsFile, JSON.stringify([]));
}

// POST endpoint to create a booking
app.post('/api/booking', (req, res) => {
    try {
        const booking = req.body;
        
        // Validate input
        if (!booking.name || !booking.age || !booking.gender || !booking.source || !booking.destination || !booking.date || !booking.bustype || !booking.seat) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Read existing bookings
        const data = fs.readFileSync(bookingsFile, 'utf8');
        const bookings = JSON.parse(data);

        // Add new booking
        booking.id = Date.now();
        booking.bookedAt = new Date().toISOString();
        bookings.push(booking);

        // Save to file
        fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));

        res.json({ success: true, message: 'Booking confirmed!', bookingId: booking.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// GET endpoint to fetch all bookings
app.get('/api/bookings', (req, res) => {
    try {
        const data = fs.readFileSync(bookingsFile, 'utf8');
        const bookings = JSON.parse(data);
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error reading bookings' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Bus Booking Server running on http://localhost:${PORT}`);
});
