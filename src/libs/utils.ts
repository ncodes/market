import { clsx, type ClassValue } from "clsx";
import forge from "node-forge";
import { XORShift } from "random-seedable";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeNumberFromInput(
  value: string,
  options: { max?: number; defaultValue?: string; allowNegative?: boolean },
) {
  const { max, defaultValue, allowNegative } = options;

  let sanitizedValue = value
    .replace(/[^\d.-]/g, "") // Remove non-numeric chars except decimal
    .replace(/(\..*)\./g, "$1"); // Allow only one decimal point

  if (sanitizedValue.includes("-")) {
    if (!allowNegative || sanitizedValue[0] !== "-") {
      sanitizedValue = sanitizedValue.replace(/-/g, ""); // Remove minus signs
    }
  }

  if (max && parseFloat(sanitizedValue) > max) {
    sanitizedValue = max.toString();
  } else if (sanitizedValue) {
    sanitizedValue = parseFloat(sanitizedValue).toString();
  }

  return sanitizedValue === "" ? (defaultValue ?? "0") : sanitizedValue;
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
