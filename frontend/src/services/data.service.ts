import baseUrl from "./baseUrl";
import axios from "axios";

export default class DataService {
  static async fetchData(){
    const url = baseUrl + "data";
    return axios.get(url);
  }
  static async fetchAllPosts({page, limit}){
  const url = `${baseUrl}all-posts?limit=${limit}&page=${page}`;
    return axios.get(url);
  }
}
