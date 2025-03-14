export class ApiSuccessResponse<T> {
  status: string;
  status_code: number;
  data: T;

  constructor(data: T, status = 'OK', status_code = 200) {
    this.status = status;
    this.status_code = status_code;
    this.data = data;
  }
}

export class ApiErrorResponse {
  status: string;
  status_code: number;
  error_message: string;

  constructor(error_message: string, status = 'OK', status_code = 200) {
    this.status = status;
    this.status_code = status_code;
    this.error_message = error_message;
  }
}
