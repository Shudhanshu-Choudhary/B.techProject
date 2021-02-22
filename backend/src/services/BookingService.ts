import Booking, { IBooking } from "../db/models/booking";
import ServiceResponse from "./ServiceResponse";

class BookingService {
  static async getAllBookings(): Promise<IBooking[]> {
    try {
      const bookings: IBooking[] = await Booking.find();
      return bookings;
    } catch (e) {
      throw e;
    }
  }
  static async createBooking(args: IBooking): Promise<IBooking> {
    try {
      const { carType, pickupLocation, pickupTime, dropOffLocation, numberOfPassengers, luggageCount, userId } = args;
      const booking: IBooking = new Booking({
        pickupLocation,
        dropOffLocation,
        pickupTime,
        userId,
        numberOfPassengers,
        luggageCount,
        carType
      });
      return await booking.save();
    } catch (e) {
      throw e;
    }
  }

  static async updateBookingById(bookingId: string, args: IBooking): Promise<IBooking> {
    try {
      const booking:IBooking = await Booking.findById(bookingId);
      if(!booking) {
        throw ServiceResponse.validationError("Invalid booking id provided");
      }
      const { carType, pickupLocation, dropOffLocation, numberOfPassengers, luggageCount } = args;
      booking.carType = carType || booking[carType];
      booking.pickupLocation = pickupLocation || booking[pickupLocation];
      booking.dropOffLocation = dropOffLocation || booking[dropOffLocation] ;
      booking.numberOfPassengers = numberOfPassengers ||  booking[numberOfPassengers] ;
      booking.luggageCount = luggageCount || booking[luggageCount] ;
      return await booking.save();
    } catch (e) {
      throw e;
    }
  }

  static async deleteBooking(bookingId: string): Promise<boolean> {
    await Booking.findOneAndDelete({ _id: bookingId });
    return true;
  }
}

export default BookingService;
