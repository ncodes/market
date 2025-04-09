import { isDev } from "./env";

/**
 * Returns true if logging is enabled
 * @returns True if logging is enabled
 */
export function isLogEnabled() {
  return import.meta.env.VITE_LOG === "true";
}

/**
 * Logs an error message
 * @param message - The message to log
 * @param optionalParams - Additional parameters to log
 */
export function logError(message?: unknown, ...optionalParams: unknown[]) {
  if (isDev() || isLogEnabled()) console.error(message, ...optionalParams);
}
