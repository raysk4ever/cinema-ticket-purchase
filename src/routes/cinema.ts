import express, { Request, Response } from 'express';
import Cinema from '../models/cinema';
import Seat from '../models/seat';

const router = express.Router();

// Create a cinema with N seats. Returns the cinema ID.
router.post('/cinemas', async (req: Request, res: Response) => {
  try {
    const { seatsCount } = req.body;
    const seats = [];
    const cinema = new Cinema({ seats: [] });
    for (let i = 0; i < seatsCount; i++) {
      const seat = new Seat({ seatNumber: i + 1, cinema: cinema._id });
      await seat.save();
      seats.push(seat._id);
    }
    await cinema.save();

    return res.json({ cinemaId: cinema._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create cinema' });
  }
});

