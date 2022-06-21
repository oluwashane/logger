#!/usr/bin/env node
const yargs = require('yargs');
const path = require('path');
const fs = require('fs');
const { timeStamp } = require('console');

const options = yargs
.usage("Usage: --i <input file>")
.usage("Usage: --0 <output file>")
.options("i", {
  alias: "input",
  describe: "input file log",
  type: "file",
  demandOption: true,  
})
.options("o", {
  alias: "output",
  describe: "output file",
  type: "file",
  demandOption: true, 
})
.argv;

const inputData = path.join(__dirname, '../file', options.input);
const data = fs.readFileSync(inputData, 'utf8');
// convert to array
const newDataArray = data.split('\n')
newDataArray.forEach(data => {
  const [timeStamp, logLevel, others] = data.split(' - ')
  const {transactionId, err, ...details} = JSON.parse(others);
  const newObject = { timeStamp, logLevel, transactionId, err: err ? err : ''  }
  console.log(newObject)
})
