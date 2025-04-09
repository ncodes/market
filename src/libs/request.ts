import { AxiosResponse } from "axios";
import { RequestError } from "./RequestError";
import { logError } from "./logging";

/**
 * Handle AXIOS error
 * @param error - The error object
 */
export function handleAxiosError(error: { response: AxiosResponse; request: unknown }): RequestError {
  if (error.response) {
    return new RequestError(error.response.status, error.response.data.error.message);
  } else if (error.request) {
    return new RequestError(500, "request error");
  } else {
    logError("handleAxiosError", error);
    return new RequestError(500, "something went wrong");
  }
}

/**
 * Checks if an error is a RequestError with a 404 status code
 * @param err - The error object
 * @returns True if the error is a RequestError with a 404 status code
 */
export function isReqErr404(err: Error) {
  if (err instanceof RequestError) {
    return err.code === 404;
  }
  return false;
}
