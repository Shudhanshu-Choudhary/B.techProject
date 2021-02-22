import baseUrl from "./baseUrl";
import axios from "axios";

export default class AuthBackendApiService {
  static async login(body:object){
    const url = baseUrl + "auth/login";
    return axios.post(url,body);
  }

  static async register(body:object){
    const url = baseUrl + "auth/register";
    return axios.post(url,body);
  }
}
