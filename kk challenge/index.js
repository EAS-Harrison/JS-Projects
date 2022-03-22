'use strict';
const fs = require("fs");
const yaml = require("js-yaml");
const inquirer = require('inquirer');
const { resourceUsage } = require("process");
//const resourceChecker = require("resource-checker");
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
        var x = totalResources.limits.cpu - totalLimits.limits.cpu
        console.log(`CPU limit is ${x} CPU too high`)
        process.exit(1)
    }
    else if (totalResources.requests.cpu > totalLimits.requests.cpu) {
        var y = totalResources.requests.cpu - totalLimits.requests.cpu
        console.log(`Cpu request is ${y} CPU is too high`)
        process.exit(1)
    }
    else if (totalResources.requests.memory > totalLimits.requests.memory) {
        var z = totalResources.requests.memory - totalLimits.requests.memory
        console.log(`Memory is ${z} too high!`)
        process.exit(1)
    }
    else {
        console.log(`Total minimum requirements OK!`)
        process.exit(0)
    }
}
let totalResources = {
    limits: {
        cpu: null,
        memory: null
    },
    requests: {
        cpu: null,
        memory: null
    }
}
for (document in docResources)
    for (containers in docResources[document].spec.template.spec.containers)
        resourcesTotals.limits.cpu += parseToInt(docResources[document].spec.template.spec.containers[0].resources.limits.cpu)
resourcesTotals.requests.cpu += parseToInt(docResources[0].spec.template.spec.containers[0].resources.requests.cpu)
resourcesTotals.limits.memory += parseToInt(docResources[0].spec.template.spec.containers[0].resources.limits.memory)
resourcesTotals.requests.memory += parseToInt(docResources[0].spec.template.spec.containers[0].resources.requests.memory)

for (document2 in docResources)
    for (initcontainers in docResources[document].spec.template.spec.initcontainers)
        resourcesTotals.limits.cpu += parseToInt(docResources[document].spec.template.spec.initcontainers[0].resources.limits.cpu)
resourcesTotals.requests.cpu += parseToInt(docResources[0].spec.template.spec.initcontainers[0].resources.requests.cpu)
resourcesTotals.limits.memory += parseToInt(docResources[0].spec.template.spec.initcontainers[0].resources.limits.memory)
resourcesTotals.requests.memory += parseToInt(docResources[0].spec.template.spec.initcontainers[0].resources.requests.memory)



// let totalResources = {
//     limits: {
//         cpu: docResources[0].spec.template.spec.containers[0].resources.limits.cpu,
//         memory: docResources[0].spec.template.spec.containers[0].resources.limits.memory
//     },
//     requests: {
//         cpu: docResources[0].spec.template.spec.containers[0].resources.requests.cpu,
//         memory: docResources[0].spec.template.spec.containers[0].resources.requests.memory
//     }
// }

// check()
// console.log(docResources[0].spec.template.spec)
// console.log(docResources[0])
