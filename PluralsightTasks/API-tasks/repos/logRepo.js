let fs = require('fs')

const FILE_NAME = './logs/log.txt'

let logRepo = {
    write: function (data, resolve, reject) {
        let toWrite = "*".repeat(80) + "\r\n"
        toWrite += "Date/Time"
    }
}