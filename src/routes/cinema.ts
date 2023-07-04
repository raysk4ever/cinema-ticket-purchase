import express, { Request, Response } from 'express';
import Cinema from '../models/cinema';
import Seat from '../models/seat';
import redisClient from '../redis';

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

// Purchase the first two free consecutive seats in cinema C.
// If there are no two consecutive seats available, return an error, otherwise return the list of seats.
router.post('/cinemas/:cinemaId/purchase-consecutive', async (req: Request, res: Response) => {
  try {
    const { cinemaId } = req.params;

    const seats = await Seat.find({ cinema: cinemaId, isPurchased: false })
      .sort('seatNumber')
      .limit(2);

    if (seats.length < 2) {
      res.status(404).json({ error: 'No consecutive seats available for purchase' });
    } else {
      await Seat.updateMany({ _id: { $in: seats.map(seat => seat._id) } }, { isPurchased: true });
      res.json(seats);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to purchase consecutive seats' });
  }
});



// Purchase a specific seat number in cinema C.
// If the seat is already purchased, return an error, otherwise return the seat.
router.post('/cinemas/:cinemaId/purchase/:seatNumber', async (req: Request, res: Response) => {
  try {
    const { cinemaId, seatNumber } = req.params;
    const lockKey = `lock:${cinemaId}:${seatNumber}`;

    // Acquire distributed lock
    const lock = await redisClient.get(lockKey)

    if (lock) {
      // Lock is already acquired by another process
      return res.status(409).json({ error: 'Seat is being purchased by another user' });
    }

    // Set distributed lock
    await redisClient.set(lockKey, 'locked', { EX: 5 }); // Set expiry time to release the lock after 5 seconds

    // Find the seat and update with OCC
    const seat = await Seat.findOneAndUpdate(
      { cinema: cinemaId, seatNumber: Number(seatNumber), isPurchased: false },
      { isPurchased: true, $inc: { version: 1 } }, // Increment the version field
      { new: true },
    );

    if (!seat) {
      // Release the lock
      await redisClient.del(lockKey);
      return res.status(404).json({ error: 'Seat not available for purchase' });
    }

    // Release the lock
    await redisClient.del(lockKey);
    return res.json(seat);
    
  } catch (error) {
    console.error('error: ', error);
    return res.status(500).json({ error: 'Failed to purchase seat' });
  }
});


export default router;
