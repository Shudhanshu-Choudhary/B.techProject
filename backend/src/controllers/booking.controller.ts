import * as express from "express";
import { Router } from "express/lib/router";
import ServiceResponse from "../services/ServiceResponse";
import BookingService from "../services/BookingService";
import { IBooking } from "../db/models/booking";

const router: Router = express.Router();

router.get("/", async (req, res) => {
  try {
    const bookings: IBooking[] = await BookingService.getAllBookings();
    res.send(bookings);
  } catch (e) {
    ServiceResponse.sendError(e, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const booking: IBooking = await BookingService.createBooking(req.body);
    res.send(booking);
  } catch (e) {
    ServiceResponse.sendError(e, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const bookingId: string = req.params.id;
    const booking: IBooking = await BookingService.updateBookingById(bookingId, req.body);
    res.send(booking);
  } catch (e) {
    ServiceResponse.sendError(e, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const bookingId: string = req.params.id;
    await BookingService.deleteBooking(bookingId);
    res.status(200);
    res.send({ success: true });
  } catch (e) {
    ServiceResponse.sendError(e, res);
  }
});

export default router;
