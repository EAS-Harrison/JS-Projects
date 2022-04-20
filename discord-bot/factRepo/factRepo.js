const FILE_NAME = './factRepo/factRepo.json'
let fs = require('fs');
let factRepo = {
    get: function (resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(JSON.parse(data))
            }
        })
    },
    getById: function (id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err)
            } else {
                let fact = JSON.parse(data).find(f => f.id == id)
                resolve(fact)
            }
        })
    },
    insert: function (newData, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err)
            } else {
                let facts = JSON.parse(data)
                facts.push(newData)
                fs.writeFile(FILE_NAME, JSON.stringify(facts), function (err) {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(newData)
                    }
                })
            }
        })
    },
    delete: function (id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err)
            } else {
                let facts = JSON.parse(data)
                let index = facts.findIndex(f => f.id == id)
                if (index != -1) {
                    facts.splice(index, 1)
                    fs.writeFile(FILE_NAME, JSON.stringify(facts), function (err) {
                        if (err) {
                            reject(err)
                        }
                        else {
                            resolve(index)
                        }
                    })
                }
            }
        })
    },
}
module.exports = factRepo