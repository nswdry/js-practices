#!/usr/bin/env node

import dayjs from "dayjs";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const now = dayjs();
const year = argv.y ? Number(argv.y) : now.year();
const month = argv.m ? Number(argv.m) : now.month() + 1;

const firstDate = dayjs(`${year}-${month}-01`);
const lastDay = firstDate.endOf("month").date();

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write("   ".repeat(firstDate.day()));

for (let i = 1; i <= lastDay; i++) {
  process.stdout.write(String(i).padStart(2, " ") + " ");
  if (dayjs(`${year}-${month}-${i}`).day() === 6) {
    console.log();
  }
}
