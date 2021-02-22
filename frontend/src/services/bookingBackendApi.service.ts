import axios from "axios";
import baseUrl from "./baseUrl";

export default class BookingBackendApiService {
  static async addBooking(body: any) {
    const url = baseUrl + "booking";
    return axios.post(url,body);
  }
  static async getAllBookings(){
    const url = baseUrl + "booking";
    return axios.get(url);
  }
  static async deleteBooking(id:string){
    const url = baseUrl + `booking/${id}`;
    return axios.delete(url);
  }
  static async updateBooking(id:string,body:object){
    const url = baseUrl + `booking/${id}`;
    return axios.put(url,body);
  }
}
