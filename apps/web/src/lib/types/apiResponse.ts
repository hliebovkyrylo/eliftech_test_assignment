export interface SuccessResponse<T> {
  status: "OK";
  status_code: number;
  data: T;
}

export interface ErrorResponse {
  status?: "ERROR";
  status_code: number;
  error_message: string;
}

export function successResponse<T>(
  data: T,
  statusCode: number = 200
): SuccessResponse<T> {
  return {
    status: "OK",
    status_code: statusCode,
    data,
  };
}

export function errorResponse(
  message: string,
  statusCode: number
): ErrorResponse {
  return {
    status: "ERROR",
    status_code: statusCode,
    error_message: message,
  };
}