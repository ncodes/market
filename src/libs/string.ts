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
 * Check if an amount is an empty string or undefined
 * @param amt - The amount
 */
export function isEmpty(amt: string | number | undefined) {
  return amt === "" || amt == undefined;
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
