import { Router } from 'express';
const router = new Router();
import Bookings from './bookings.js'
const bookings=new Bookings();

router.get('/seats',bookings.GetAllSeats)
router.post('/book',bookings.BookSeat)
export default router