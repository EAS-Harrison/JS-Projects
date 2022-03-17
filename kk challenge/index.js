const fs = require("fs");
const yaml = require("js-yaml");
const resourceChecker = require("resource-checker");
const myArgs = process.argv.slice(2);
const docLimits = yaml.loadAll(fs.readFileSync(myArgs[0]));
const docResources = yaml.loadAll(fs.readFileSync(myArgs[1]));



// Make the data have a base unit
const parseToInt = (string) => {
    if (string.includes('m')) {
        return +string.substring(0, string.length - 1) / 1000
    }
    if (string.includes('Gi')) {
        return +string.substring(0, string.length - 2) * 2000
    }
    if (string.includes('Mi')) {
        return +string.substring(0, string.length - 2)
    }
    return +string.substring(0, string.length)
}    
function check() {
    if (totalResources.limits.cpu > totalLimits.limits.cpu) {
            var a = totalResources.limits.cpu - totalLimits.limits.cpu
            console.log(`CPU limit is ${a} CPU too high`)
            process.exit(1)
}
else if (totalResources.requests.cpu > totalLimits.requests.cpu){
    var c = totalResources.requests.cpu - totalLimits.requests.cpu
    console.log(`Cpu request is ${c} CPU is too high`)
    process.exit(1)
}
else if (totalResources.requests.memory > totalLimits.requests.memory){
    var d = totalResources.requests.memory - totalLimits.requests.memory
    console.log(`Memory is ${d} too high!`)
    process.exit(1)
}
else {console.log(`Total minimum requirements OK!`)
process.exit(0)
}}
let totalResources = {
    limits: {
        cpu: 0,
        memory: 0
    },
    requests: {
        cpu: 0,
        memory: 0
    }
}
let totalLimits = {
    limits: {
        cpu: docLimits[0].total.limit.cpu,
        memory: docLimits[0].total.limit.mem
    },
    requests: {
        cpu: docLimits[0].total.request.cpu,
        memory: docLimits[0].total.request.mem
    }
};
console.log(totalLimits)
console.log(totalResources)
check()
