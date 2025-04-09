import { clsx, type ClassValue } from "clsx";
import forge from "node-forge";
import { XORShift } from "random-seedable";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeNumber(
  value: string,
  options: { max?: number; min?: number; defaultValue?: string; allowNegative?: boolean },
) {
  const { max, min, defaultValue, allowNegative } = options;

  let newVal = value
    .replace(/[^\d.-]/g, "") // Remove non-numeric chars except decimal
    .replace(/(\..*)\./g, "$1"); // Allow only one decimal point

  // Remove negative sign if it's not allowed
  if (newVal.includes("-") && (!allowNegative || newVal[0] !== "-")) {
    newVal = newVal.replace(/-/g, "");
  }

  // Clamp the value if it's outside the min or max
  if (max && parseFloat(newVal) > max) {
    newVal = max.toString();
  } else if (min && parseFloat(newVal) < min) {
    newVal = min.toString();
  }

  // Return the value if it ends with a decimal point.
  // This is to prevent the value from being truncated too early.
  if (newVal.endsWith(".")) {
    return newVal;
  }

  return newVal === "" ? (defaultValue ?? "0") : newVal;
}

/**
 * Get a random choice from an array
 * @param choices - The array of choices
 * @param seed - An optional seed to use for the random choice
 * @returns A random choice from the array
 */
export function getRandomSeed<T>(choices: T[], seed?: string): T {
  return new XORShift(
    forge.md.sha1
      .create()
      .update(seed?.toLowerCase() || forge.random.getBytesSync(32).toString())
      .digest()
      .getInt32(),
  ).choice(choices);
}
