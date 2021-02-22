export default class StorageService {
  static setKey(key: string, value:any) {
    localStorage.setItem(key, value);
  }
  static removeKey(key: string) {
    localStorage.removeItem(key);
  }
  static clearStorage() {
    localStorage.clear();
  }
  static getValueFromKey(key: string) {
    return localStorage.getItem(key);
  }
}
