import { GetAllSeats,createBooking,UpdateSeat,GetSeats } from "../repository.js";
import { Booking } from "../model.js";
class Bookings{
    async GetAllSeats(req,res){
        try {
            const seats = await GetAllSeats();
            res.status(200).json(seats);
          } catch (error) {
            res.json({ message: error.message });
          }
    }
    async BookSeat(req,res){
        try{
        const { name, seats } = req.body;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
        res.setHeader('Content-Type', 'application/json');

        const ROW_SEATS = [7,7,7,7,7,7,7,7,7,7,7,3];
        let numSeats = parseInt(seats);
        if(numSeats <= 0 || numSeats > 7) {
          return res.json({data:{
            message:"Please give input in the range of 1-7",
            error:"Input out of range",
          }})
          
        }
        var offset_value=1
        for(let i=0; i<ROW_SEATS.length; i++) {
        let availableSeats = await GetSeats({ seat_number: { $gte: offset_value, $lt: offset_value+ROW_SEATS[i] }, status: 0 });
        let reservedSeats=[]
        if(availableSeats.length>=numSeats){
          for(let j=0;j<numSeats;j++){
            reservedSeats.push(availableSeats[j].seat_number)
            try{
            await UpdateSeat(availableSeats[j].seat_number , { status: 1 });
            }catch(err){
              return res.json({data:{
                error:err,
              }})
              // console("---error while updating",err)
            }
          }
          createBooking(new Booking({name:name,seats:numSeats}))
        //   new Booking({name:name,seats:numSeats}).save().then(() => console.log('Booking created successfully'))
          .catch(error => console.error(error));
          return res.status(200).json({data:{
            message:"tickets booked successfully,Here are the seat numbers ",
            seat_numbers:`${reservedSeats.join(', ')}`,
          }})
          
        }
        offset_value+=ROW_SEATS[i]
        }
        return res.json({data:{
          message:`Sorry, seats are not available in the coach`,
          error:"inavailability"
        }})
        
      }catch(err){
        return res.json({data:{
          error:err,
        }})
      }
}
}
export default Bookings