import { GetAllSeats,createBooking,UpdateSeat,GetSeats } from "../repository.js";
import { Booking } from "../model.js";
class Bookings{
    async GetAllSeats(req,res){
        try {
            const seats = await GetAllSeats();
            res.status(200).json(seats);
          } catch (error) {
            res.status(500).json({ message: error.message });
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
          return res.status(500).json({data:{
            error:"Please give input in the range of 0-7",
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
              return res.status(500).json({data:{
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
            error:null
          }})
          
        }
        offset_value+=ROW_SEATS[i]
        }
        return res.status(500).json({data:{
          message:`Sorry, seats are not available in the coach`,
          error:null
        }})
        
      }catch(err){
        return res.status(500).json({data:{
          error:err,
        }})
      }
}
}
export default Bookings