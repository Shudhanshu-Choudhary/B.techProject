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

  static async getUserFromToken(token: string) {
    const url = baseUrl + `user?token=${token}`;
    return axios.get(url);
  }

  static async loginWithGoogle() {
    window.location.href = baseUrl + "auth/login/google";
  }

  static async loginWithFacebook() {
    window.location.href = baseUrl + "auth/login/facebook";
  }
}
