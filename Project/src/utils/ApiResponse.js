class ApiResponse {
  constructor(status, message="Succcess", data) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = status >= 200 && status < 400;
  }
}