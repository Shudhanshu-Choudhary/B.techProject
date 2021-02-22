export default class ServiceResponse {
    static statusCode = 500;
    static message = "Some error occured";
    static e = null;

    static unauthorizedError(message = "Unauthorized"):void {
      this.statusCode = 401;
      throw new Error(message);
    }
    static systemError(e, message = "Some error occurred"): void {
      this.statusCode = 500;
      this.message = message;
      this.e = e;
    }
    static validationError(message = "Invalid Data Provided in payload"): void {
      this.statusCode = 400;
      this.message = message;
    }
    static sendError(e, res: any): void {
      if(e) {
        this.systemError(e);
      } else {
        res.status(this.statusCode);
        if(this.e) {
          res.send({ status: this.statusCode, message: this.e.toString() });
          this.e = null;
        }
        else res.send({ status: this.statusCode, message: this.message });
      }
    }
}
