const childProcess = require('child_process');
const fs = require('fs');
const events = require('events');

const GET_PROCESS = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
const SHOW_INFO_TIMEOUT = 200;
const LOG_INFO_TIMEOUT = 5000;
const LOG_FILE_NAME = 'activityMonitor.log';
const PROCESS_INFO_EVENT = 'process-info';

const eventEmitter = new events.EventEmitter();

const exec = (command) => {
    childProcess.exec(command, (error, stdout) => {
        console.clear();
        console.log(stdout);
        eventEmitter.emit(PROCESS_INFO_EVENT, stdout);
    });
};

const logInfo = (line) => {
    fs.appendFile(LOG_FILE_NAME, line, (err) => {
        if (err) {
            throw err;
        }
    });
};

setInterval(() => {
    exec(GET_PROCESS);
}, SHOW_INFO_TIMEOUT);

setInterval(() => {
    eventEmitter.once(PROCESS_INFO_EVENT, (data) => {
        logInfo(data);
    });
}, LOG_INFO_TIMEOUT);