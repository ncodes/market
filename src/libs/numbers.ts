import approx from "approximate-number";
import Decimal from "decimal.js";
import { BigNumberish } from "ethers";
import numeral from "numeral";

/**
 * Returns n * 10^power
 * @param n - The number to multiply
 * @param power - The power to raise 10 to
 * @returns The result of n * 10^power
 */
export function powOf(n: BigNumberish, power: number) {
  return toDec(n.toString())
    .mul(toDec(pow10(power).toString()))
    .toFixed(0);
}

/**
 * Returns 10^decimals as a Decimal object
 * @param decimals - The number of decimals to raise 10 to
 * @returns The result of 10^decimals
 */
export function pow10D(decimals: number) {
  return toDec(10).pow(decimals);
}

/**
 * Returns 10^decimals
 * @param decimals - The number of decimals to raise 10 to
 * @returns The result of 10^decimals
 */
export function pow10(decimals: number) {
  return toDec(10).pow(decimals);
}

/**
 * Convert a number to a BigNumber
 * @param val - The value to convert
 */
export function toBigInt(val: BigNumberish) {
  return BigInt(val);
}

/**
 * Convert amount to high denomination
 * @param amount The target amount (in low denomination like wei)
 * @param decimals The decimal of the asset
 * @param places The amount of places
 * @param stripZeros If true, strips trailing zeros
 */
export function toHD(amount: bigint | Decimal | string, decimals = 18, places = 8, stripZeros = true) {
  return toHDD(amount, decimals, places, stripZeros).toFixed();
}

/**
 * Convert amount to high denomination and returns Decimal
 * @param amount The target amount (in low denomination like wei)
 * @param decimals The decimal of the asset
 * @param places The amount of places
 * @param stripZeros If true, strips trailing zeros
 */
export function toHDD(amount: bigint | Decimal | string, decimals = 18, places = 8, stripZeros = true) {
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
export function toLD(amount: bigint | Decimal | number | string, decimals = 18) {
  return toLDD(amount, decimals).toFixed(0);
}

/**
 * Convert amount to low denomination but returns a Decimal
 * @param amount
 * @param decimals
 */
export function toLDD(amount: bigint | Decimal | number | string, decimals = 18) {
  return toDec(amount.toString()).mul(toDec(10).pow(decimals));
}

/**
 * Convert a number to a Decimal
 * @param val - The value to convert
 */
export function toDec(val: string | number | bigint | Decimal) {
  return new Decimal(val.toString());
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
  v: bigint | string | Decimal,
  decimals = 18,
  format?: string | number,
  places?: number,
  approxAt = 0,
) {
  const hd = toHD(v, decimals);
  if (!approxAt || toDec(hd).lt(approxAt)) return formatToMoney(hd, format, places);
  return approxNumber(hd, places);
}

/**
 * Format a number to human-readable money format
 * @param v - The value to format
 * @param format - The format to use
 * @param places - Decimal places to use when v is a decimal number
 */
export function formatToMoney(v: string | number, format?: string | number, places = 6) {
  if (!v) return;
  if (toDec(v).lt(1)) return trimZeros(toDec(v).toFixed(places));
  const param = typeof v === "number" ? v.toLocaleString() : v;
  const fmt = format || (typeof v === "number" ? "0,0.[00]" : "0,0.[0000]");
  return numeral(param).format(fmt.toString()) !== "NaN" ? numeral(param).format(fmt.toString()) : 0;
}

/**
 * Approximate a number to human-readable format
 * @param num - The number to approximate
 * @param precision - The precision to use
 */
export function approxNumber(num: number | string | undefined, precision?: number) {
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
export function toHighDenomAndApprox(v: bigint, decimals = 18, precision?: number) {
  return approxNumber(toDec(v.toString()).div(toDec(10).pow(decimals)).toNumber(), precision);
}

/**
 * Checks if an amount is negative
 * @param amt - The amount
 */
export function isNegative(amt: string | number) {
  return toDec(amt).isNegative();
}

/**
 * Check if an amount is '0', 0 or undefined
 * @param amt - The amount
 */
export function isZero(amt: string | number | undefined) {
  return !amt || toDec(amt).isZero();
}
