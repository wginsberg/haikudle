const fs = require('fs');

const FIRST_DATE = new Date("2023-06-10")
const TWENTY_FOUR_HOURS = 60*60*1000*24
const FILE_NAME = "lines.txt"

const today = new Date()

const todayIndex = Math.floor((today - FIRST_DATE) / TWENTY_FOUR_HOURS)

let data
try {
  data = fs.readFileSync(FILE_NAME);
} catch (err) {
  console.error(err);
  process.exit(1)
}

const lines = data.toString().split("\n")
const line = lines[todayIndex]

console.log(line)
