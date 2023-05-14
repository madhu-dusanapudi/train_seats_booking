import { Booking,Seat } from "./model.js";

const createBooking = async (bookingSchema = {}) => {
    let booking = await Booking.create(bookingSchema);
    return booking;
};

const UpdateSeat = async (seat_number, seatSchema = {}) => {
    return await Seat.findOneAndUpdate(
        {
            seat_number: seat_number
        },
        {
            ...seatSchema
        }
    );
}
async function GetAllSeats() {
    return await Seat.find({}).lean()
}
async function GetSeats(query) {
    return await Seat.find(query).lean()
}
export {
    createBooking,
    UpdateSeat,
    GetAllSeats,
    GetSeats
}