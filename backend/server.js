const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tickets = 100;
let lock = false;

app.post("/api/book", async (req, res) => {

    if (lock) {
        return res.json({
            success: false,
            message: "Another booking is in progress"
        });
    }

    lock = true;

    if (tickets <= 0) {
        lock = false;
        return res.json({
            success: false,
            message: "Sold out"
        });
    }

    const bookingId = Date.now();
    tickets--;

    lock = false;

    res.json({
        success: true,
        bookingId: bookingId,
        remaining: tickets
    });
});

app.listen(3000, () => {
    console.log("Booking system running on port 3000");
});