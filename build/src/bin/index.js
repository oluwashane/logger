#!/usr/bin/env node
"use strict";
const yargs = require('yargs');
const path = require('path');
const fs = require('fs');
// convert to array
class Logger {
    constructor() {
        this.inputData = path.join(__dirname, '../../', '../file', this.options().input);
        this.data = fs.readFileSync(this.inputData, 'utf8');
        this.formattedDocument = [];
    }
    options() {
        const options = yargs
            .usage('Usage: --i <input file>')
            .usage('Usage: --0 <output file>')
            .options('i', {
            alias: 'input',
            describe: 'input file log',
            type: 'file',
            demandOption: true,
        })
            .options('o', {
            alias: 'output',
            describe: 'output file',
            type: 'file',
            demandOption: true,
        }).argv;
        return options;
    }
    readData() {
        const newDataArray = this.data.split('\n');
        newDataArray.forEach((data) => {
            const [timeStamp, logLevel, others] = data.split(' - ');
            const { transactionId, err, ...details } = JSON.parse(others);
            const newObject = {
                timeStamp,
                logLevel,
                transactionId,
                err: err ? err : '',
            };
            this.formattedDocument.push(newObject);
        });
    }
    start() {
        this.readData();
        console.log(this.formattedDocument);
    }
}
const logger = new Logger();
logger.start();
//# sourceMappingURL=index.js.map