const fs = require('fs')

const FIRST_DATE = new Date('2023-06-10')
const TWENTY_FOUR_HOURS = 60 * 60 * 1000 * 24
const FILE_NAME = 'lines.txt'

const today = new Date()

const todayIndex = Math.floor((today - FIRST_DATE) / TWENTY_FOUR_HOURS)

let data
try {
  data = fs.readFileSync(FILE_NAME)
} catch (err) {
  console.error(err)
  process.exit(1)
}

const lines = data.toString().split('\n')
const haiku = lines[todayIndex]
const tomorrowHaiku = lines[todayIndex + 1]

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const date = `${year}-${month}-${day}`;

const json = JSON.stringify({ haiku, tomorrowHaiku, date })

console.log(json)
