import approx from "approximate-number";
import { AxiosResponse } from "axios";
import Decimal from "decimal.js";
import { formatUnits } from "ethers";
import * as humanizeDuration from "humanize-duration";
import numeral from "numeral";
import prettyBytes from "pretty-bytes";
import { RequestError } from "./RequestError.ts";

export function isDev() {
  return import.meta.env.VITE_ENV === "development";
}

export function isProd() {
  return import.meta.env.VITE_ENV === "production";
}

export function isLocal() {
  return import.meta.env.VITE_LOCAL === "true";
}

export function isLogEnabled() {
  return import.meta.env.VITE_LOG === "true";
}

export function logError(message?: unknown, ...optionalParams: unknown[]) {
  if (isDev() || isLogEnabled()) console.error(message, ...optionalParams);
}

// pow10D returns 10^decimals as a Decimal object
export function pow10D(decimals: number) {
  return toDec(10).pow(decimals);
}

/**
 * Convert amount to high denomination
 * @param amount The target amount (in low denomination like wei)
 * @param decimals The decimal of the asset
 * @param places The amount of places
 * @param stripZeros If true, strips trailing zeros
 */
export function toHD(
  amount: bigint | Decimal,
  decimals = 18,
  places = 8,
  stripZeros = true,
) {
  return toHDD(amount, decimals, places, stripZeros).toFixed();
}

/**
 * Convert amount to high denomination and returns Decimal
 * @param amount The target amount (in low denomination like wei)
 * @param decimals The decimal of the asset
 * @param places The amount of places
 * @param stripZeros If true, strips trailing zeros
 */
export function toHDD(
  amount: bigint | Decimal,
  decimals = 18,
  places = 8,
  stripZeros = true,
) {
  let val: Decimal = toDec(amount).div(toDec(10).pow(decimals));
  if (places > 0) val = val.toDecimalPlaces(places);
  if (stripZeros && val.lt(1)) return toDec(trimZeros(val.toFixed()));
  return val;
}

/**
 * Strip trailing zeros from a given decimal number
 * @param amt
 */
export function trimZeros(amt: string | number | Decimal) {
  const amtStr = toDec(amt).toFixed();
  return amtStr.indexOf(".") != -1 ? amtStr.replaceAll(/0+$/g, "") : amtStr;
}

/**
 * Convert amount to low denomination
 * @param amount The target amount (in high denomination like eth)
 * @param decimals The decimal of the asset
 */
export function toLD(amount: bigint | Decimal, decimals = 18) {
  return toLDD(amount, decimals).toFixed(0);
}

/**
 * Convert amount to low denomination but returns a Decimal
 * @param amount
 * @param decimals
 */
export function toLDD(amount: bigint | Decimal, decimals = 18) {
  return toDec(amount.toString()).mul(toDec(10).pow(decimals));
}

/**
 * Convert a number to a Decimal
 * @param val - The value to convert
 */
export function toDec(val: string | number | bigint | bigint | Decimal) {
  return new Decimal(val.toString());
}

/**
 * Handle AXIOS error
 * @param error - The error object
 */
export function handleAxiosError(error: {
  response: AxiosResponse;
  request: unknown;
}): RequestError {
  if (error.response) {
    return new RequestError(
      error.response.status,
      error.response.data.error.message,
    );
  } else if (error.request) {
    return new RequestError(500, "request error");
  } else {
    logError("handleAxiosError", error);
    return new RequestError(500, "something went wrong");
  }
}

export function isReqErr404(err: Error) {
  if (err instanceof RequestError) {
    return err.code === 404;
  }
  return false;
}

/**
 * Format a number to a high denomination (e.g 1,000,000,000,000,000,000 WEI -> 1.0 ETH)
 * @param v - The value to format
 * @param decimals - The number of decimals
 * @param format - The format to use
 * @param places - Decimal places to use when v is a decimal number
 * @param approxAt - Approximate to human-readable format at greater or equal to this value
 */
export function formatToHighDenom(
  v: bigint,
  decimals = 18,
  format?: string | number,
  places?: number,
  approxAt = 0,
) {
  const hd = formatUnits(v, decimals);
  if (!approxAt || toDec(hd).lt(approxAt))
    return formatToMoney(hd, format, places);
  return approxNumber(hd, places);
}

/**
 * Format a number to human-readable money format
 * @param v - The value to format
 * @param format - The format to use
 * @param places - Decimal places to use when v is a decimal number
 */
export function formatToMoney(
  v: string | number,
  format?: string | number,
  places = 6,
) {
  if (!v) return;
  if (toDec(v).lt(1)) return trimZeros(toDec(v).toFixed(places));
  const param = typeof v === "number" ? v.toLocaleString() : v;
  const fmt = format || (typeof v === "number" ? "0,0.[00]" : "0,0.[0000]");
  return numeral(param).format(fmt.toString()) !== "NaN"
    ? numeral(param).format(fmt.toString())
    : 0;
}

/**
 * Shorten an address and include ellipsis at the middle
 * @param address - The address
 * @param lLen - The length of the left side
 * @param rLen - The length of the right side
 */
export function shortenAddress(address: string, lLen = 6, rLen = 4) {
  if (!address) return address;
  return `${address.substring(0, lLen)}...${address.substring(address.length, address.length - rLen)}`;
}

/**
 * Shorten an address and end it with ellipsis
 * @param address
 */
export function shortenAddress2(address: string) {
  if (!address) return address;
  return `${address.substring(0, 6)}...`;
}

/**
 * Approximate a number to human-readable format
 * @param num - The number to approximate
 * @param precision - The precision to use
 */
export function approxNumber(
  num: number | string | undefined,
  precision?: number,
) {
  if (num == undefined) return num;
  if (typeof num === "string") num = parseFloat(num);
  return approx(num, { precision });
}

/**
 * Convert a number to a high denomination and approximate
 * @param v - The value to convert
 * @param decimals - The number of decimals
 * @param precision - The precision
 */
export function toHighDenomAndApprox(
  v: bigint,
  decimals = 18,
  precision?: number,
) {
  return approxNumber(
    toDec(v.toString()).div(toDec(10).pow(decimals)).toNumber(),
    precision,
  );
}

/**
 * Humanize a duration. Returns output like 1day, 1hr, 1min, 1sec
 * @param sec - The duration in seconds
 */
export function humanizeDur(sec: number) {
  let units: humanizeDuration.Unit[] | undefined = [];
  if (sec < 3600) units = ["m", "s"];
  else if (sec < 86400) units = ["h", "m"];
  else if (sec > 86400) units = ["d", "h"];

  const humanizer = humanizeDuration.humanizer({
    units,
    maxDecimalPoints: 0,
    language: "shortEn",
    languages: {
      shortEn: {
        y: () => "y",
        mo: (v) => (v && v <= 1 ? "mo" : "mos"),
        d: (v) => (v && v <= 1 ? "day" : "days"),
        h: (v) => (v && v <= 1 ? "hr" : "hrs"),
        m: (v) => (v && v <= 1 ? "min" : "mins"),
        s: (v) => (v && v <= 1 ? "sec" : "secs"),
        ms: () => "ms",
      },
    },
  });

  return humanizer(sec * 1000);
}

/**
 * Humanize a duration. Returns output like 1d, 1h, 1m, 1s
 * @param seconds - The duration in seconds
 */
export function humanizeDur2(seconds: number) {
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30; // Approximate months as 30 days
  const year = day * 365; // Approximate years as 365 days

  let time: string;

  if (seconds < minute) {
    time = Math.round(seconds) + "s";
  } else if (seconds < hour) {
    time = Math.round(seconds / minute) + "m";
  } else if (seconds < day) {
    time = Math.round(seconds / hour) + "h";
  } else if (seconds < month) {
    time = Math.round(seconds / day) + "d";
  } else if (seconds < year) {
    time = Math.round(seconds / month) + "mo";
  } else {
    time = Math.round(seconds / year) + "y";
  }

  return time;
}

/**
 * Check if a string is equal to another string, ignoring case.
 * @param a - The first string
 * @param b - The second string
 * @return false if either string is undefined
 * @return true if the strings are equal
 */
export function isEqlStr(a?: string, b?: string) {
  if (a == undefined || b == undefined) return false;
  return a.toLowerCase() === b.toLowerCase();
}

/**
 * Check if an amount is '0', 0 or undefined
 * @param amt - The amount
 */
export function isZero(amt: string | number | undefined) {
  return !amt || toDec(amt).isZero();
}

export function isNegative(amt: string | number) {
  return toDec(amt).isNegative();
}

/**
 * Check if an amount is an empty string or undefined
 * @param amt - The amount
 */
export function isEmpty(amt: string | number | undefined) {
  return amt === "" || amt == undefined;
}

// Delay for a number of milliseconds
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function humanizeBytes(bytes: number | string) {
  return prettyBytes(Number(bytes));
}

export function uint8ArrayToB64(bytes: Uint8Array) {
  return Buffer.from(bytes).toString("base64");
}

export function iOSversion() {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    const v = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (!v) return [];
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || "0", 10)];
  }
}
