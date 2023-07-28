const fs = require("fs");
const { parse } = require("csv-parse");

const outputArr = [];

fs.createReadStream("./blocklist.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    outputArr.push({
        "user_id": row[0],
        "user": {
            "name": row[1],
            "screen_name": row[1]
        },
        "reason": -1,
    })
  })
  .on("end", function () {
    fs.writeFileSync("output.json", JSON.stringify(outputArr))
  })
