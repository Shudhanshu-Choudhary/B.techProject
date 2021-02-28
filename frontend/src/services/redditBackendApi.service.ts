import baseUrl from "./baseUrl";
import axios from "axios";

export default class RedditBackendApiService {
  static async fetchStocksData(){
    const url = baseUrl + "stocks-data";
    return axios.get(url);
  }
}
