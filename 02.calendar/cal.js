#!/usr/bin/env node

import dayjs from "dayjs";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const now = dayjs();
const year = argv.y >= 1970 && argv.y <= 2100 ? argv.y : now.year();
const month = argv.m >= 1 && argv.m <= 12 ? argv.m : now.month() + 1;

const firstDate = dayjs(`${year}-${month}-01`);
const lastDate = firstDate.endOf("month");

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write("   ".repeat(firstDate.day()));

for (
  let date = firstDate;
  date.isBefore(lastDate, "day") || date.isSame(lastDate, "day");
  date = date.add(1, "day")
) {
  process.stdout.write(String(date.date()).padStart(2, " "));
  if (!date.isSame(lastDate, "day")) {
    if (date.day() === 6) {
      console.log();
    } else {
      process.stdout.write(" ");
    }
  }
}
