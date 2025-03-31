import * as humanizeDuration from "humanize-duration";
import prettyBytes from "pretty-bytes";

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
 * Humanize bytes
 * @param bytes - The bytes
 */
export function humanizeBytes(bytes: number | string) {
  return prettyBytes(Number(bytes));
}
