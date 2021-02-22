import ServiceResponse from "../services/ServiceResponse";

class ValidationUtil {
  static validateEmptyKeys(object, keys): void {
    keys.forEach((key) => {
      if(!(key in object)){
        throw ServiceResponse.validationError(`${key} is required and can not be blank.`);
      }
    });
  }

  static addNums(first: number, second: number): number {
    return first + second;
  }
}

export default ValidationUtil;
