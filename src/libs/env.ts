/**
 * Returns true if the environment is development
 * @returns True if the environment is development
 */
export function isDev() {
  return import.meta.env.VITE_ENV === "development";
}

/**
 * Returns true if the environment is production
 * @returns True if the environment is production
 */
export function isProd() {
  return import.meta.env.VITE_ENV === "production";
}

/**
 * Returns true if the environment is local
 * @returns True if the environment is local
 */
export function isLocal() {
  return import.meta.env.VITE_LOCAL === "true";
}
