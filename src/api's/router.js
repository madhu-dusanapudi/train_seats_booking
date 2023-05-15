import { Router } from 'express';
const router = new Router();
import Bookings from './bookings.js'
import cors from 'cors'
const bookings=new Bookings();

router.get('/seats',cors(),bookings.GetAllSeats)
router.post('/book',cors(),bookings.BookSeat)
export default router