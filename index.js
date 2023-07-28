const fs = require("fs");
const { parse } = require("csv-parse");

const inputFileName = "./blocklist.csv"

let outputArr = [];
let count = 0;
let fileIndex = 0;

const dir = './output';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

fs.createReadStream(inputFileName)
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    if (row[2]) {
      return
    }

    outputArr.push({
        "user_id": row[0],
        "user": {
            "name": row[1],
            "screen_name": row[1]
        },
        "reason": 0,
    })

    count++;

    if (count === 5000) {
      writeJsonToOutput(outputArr)
      count = 0;
      fileIndex++;
      outputArr = [];
    }
  })
  .on("end", function () {
    writeJsonToOutput(outputArr)
  })


function writeJsonToOutput(outputArr) {
  fs.writeFileSync(`output/output-${fileIndex}.json`, JSON.stringify(outputArr))
}