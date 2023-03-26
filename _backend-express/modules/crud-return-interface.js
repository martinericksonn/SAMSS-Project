class CRUDReturn {
    success = false;
    data = {};
    message = "";
  
    constructor(success = false, data = {}, message = "") {
      if(success ==false){
        console.log('ERROR DETECTED AND RETURNED')
        console.log(message);
        console.log(data);
      }
      this.success = success;
      this.data = data;
      this.message = message;
    }
  
    json() {
      return {
        success: this.success,
        data: this.data,
        message: this.message,
      };
    }
  }
  
  module.exports.CRUDReturn = CRUDReturn;
  