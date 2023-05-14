import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    seats: { type: Number, required: true }
  });
  
  // Define the bookings model
  const Booking = mongoose.model('Booking', bookingSchema);
  
  // Define the database schema for the seats collection
  const seatSchema = new mongoose.Schema({
    seat_number: { type: Number, required: true },
    status: { type: Number, required: true }
  });
  // Define the seats model
  const Seat = mongoose.model('Seat', seatSchema);
  export {
    Booking,Seat
  }