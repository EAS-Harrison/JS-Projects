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
// for (let document in docResources) {
//     for (let containers in docResources[document].spec.template.spec.containers) {
//         totalResources.containers.limits.cpu += parseToInt(docResources[document].spec.template.spec.containers[containers].resources.limits.cpu)
//         totalResources.containers.requests.cpu += parseToInt(docResources[document].spec.template.spec.containers[containers].resources.requests.cpu)
//         totalResources.containers.limits.memory += parseToInt(docResources[document].spec.template.spec.containers[containers].resources.limits.memory)
//         totalResources.containers.requests.memory += parseToInt(docResources[document].spec.template.spec.containers[containers].resources.requests.memory)
//     }
//     for (let initContainers in docResources[document].spec.template.spec.initContainers) {
//         totalResources.initContainers.limits.cpu += parseToInt(docResources[document].spec.template.spec.initContainers[initContainers].resources.limits.cpu)
//         totalResources.initContainers.requests.cpu += parseToInt(docResources[document].spec.template.spec.initContainers[initContainers].resources.requests.cpu)
//         totalResources.initContainers.limits.memory += parseToInt(docResources[document].spec.template.spec.initContainers[initContainers].resources.limits.memory)
//         totalResources.initContainers.requests.memory += parseToInt(docResources[document].spec.template.spec.initContainers[initContainers].resources.requests.memory)
//     }
// }
// console.log(totalResources)
let totalResources = {}

docResources.forEach((document) => {
    let namespace = document.metadata.namespace;
    totalResources[namespace] = {
        total: {
            limit: {
                cpu: null,
                mem: null
            },
            request: {
                cpu: null,
                mem: null
            }
        },
        containers: {
            limits: {
                cpu: null,
                mem: null
            },
            requests: {
                cpu: null,
                mem: null
            }
        },
        initContainers: {
            limits: {
                cpu: null,
                mem: null
            },
            requests: {
                cpu: null,
                mem: null
            }
        }
    }
})
console.log(totalResources.namespace1)


// console.log(docLimits[0].namespace)
