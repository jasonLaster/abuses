const csvFilePath = "./videos.csv";
const csv = require("csvtojson");
const fs = require("fs");

csv({ delimiter: "\t" })
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    fs.writeFileSync("./videos.json", JSON.stringify(jsonObj, null, 2));
  });
