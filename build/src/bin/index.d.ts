#!/usr/bin/env node
declare const yargs: any;
declare const path: any;
declare const fs: any;
declare class Logger {
    data: any;
    inputData: any;
    formattedDocument: any;
    constructor();
    options(): any;
    readData(): void;
    start(): void;
}
declare const logger: Logger;
