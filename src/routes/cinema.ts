import express from 'express';
import CinemaController from '../controllers/cinema';

const router = express.Router();

// Create a cinema with N seats. Returns the cinema ID.
router.post('/cinemas', CinemaController.createCinema);

// Purchase the first two free consecutive seats in cinema C.
// If there are no two consecutive seats available, return an error, otherwise return the list of seats.
router.post('/cinemas/:cinemaId/purchase-consecutive', CinemaController.purchaseConsecutiveSeats);

// Purchase a specific seat number in cinema C.
// If the seat is already purchased, return an error, otherwise return the seat.
router.post('/cinemas/:cinemaId/purchase/:seatNumber', CinemaController.purchaseSeat);

export default router;
