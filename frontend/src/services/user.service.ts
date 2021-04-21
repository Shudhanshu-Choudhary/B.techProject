import baseUrl from "./baseUrl";
import axios from "axios";
import StorageService from "./storageService";

class UserService {
  static async saveUserPicks(stockPicks: string[]) {
    const url = baseUrl + "update-picks";
    console.log("URL IS", url);
    return axios.put(url,{ stockPicks }, { headers: {
      token: StorageService.getValueFromKey("token")
    } });
  }
}

export default UserService;
