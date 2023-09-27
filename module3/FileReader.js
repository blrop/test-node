const fs = require("fs");
const csv = require("csvtojson");

const INPUT_FILE_NAME = `${__dirname}/input-data.csv`;
const OUTPUT_FILE_NAME = '/home/olvin/output-data.json';

const readableStream = fs.createReadStream(INPUT_FILE_NAME);
const writableStream = fs.createWriteStream(OUTPUT_FILE_NAME);

readableStream.setEncoding('UTF8');

const converter = csv({
    ignoreColumns: /Amount/,
});

readableStream.on('readable', function() {
    while ((chunk = readableStream.read()) !== null) {
        converter
            .fromString(chunk)
            .then((data) => {
                data.forEach((item) => {
                    writableStream.write(JSON.stringify(item) + '\n');
                })
            });


    }
});

readableStream.on('error', function(err) {
    console.log(`File read error: ${err.stack}`);
});
