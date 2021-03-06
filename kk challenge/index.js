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
let totalResources = {}
docResources.forEach((document) => {
    let namespace = document.metadata.namespace;
    totalResources[namespace] = {
        total: {
            limits: {
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
            request: {
                cpu: null,
                mem: null
            }
        },
        initContainers: {
            limits: {
                cpu: null,
                mem: null
            },
            request: {
                cpu: null,
                mem: null
            }
        },
        sidecars: {
            limit: {
                cpu: null,
                mem: null
            },
            request: {
                cpu: null,
                mem: null
            }
        }
    }

    // console.log(document.spec.template.spec)
    // console.log(document)
    totalResources[namespace].containers.limits.cpu += parseToInt(document.spec.template.spec)
})
// for (let document in docResources) {
//     for (let containers in docResources[document].spec.template.spec.containers) {
//         totalResources[namespace].containers.limits.cpu += parseToInt(docResources[document].spec.template.spec.containers[containers].resources.limits.cpu)
//         totalResources[namespace].containers.requests.cpu += parseToInt(docResources[document].spec.template.spec.containers[containers].resources.requests.cpu)
//         totalResources[namespace].containers.limits.memory += parseToInt(docResources[document].spec.template.spec.containers[containers].resources.limits.memory)
//         totalResources[namespace].containers.requests.memory += parseToInt(docResources[document].spec.template.spec.containers[containers].resources.requests.memory)
//     }
//     for (let initContainers in docResources[document].spec.template.spec.initContainers) {
//         totalResources[namespace].initContainers.limits.cpu += parseToInt(docResources[document].spec.template.spec.initContainers[initContainers].resources.limits.cpu)
//         totalResources[namespace].initContainers.requests.cpu += parseToInt(docResources[document].spec.template.spec.initContainers[initContainers].resources.requests.cpu)
//         totalResources[namespace].initContainers.limits.memory += parseToInt(docResources[document].spec.template.spec.initContainers[initContainers].resources.limits.memory)
//         totalResources[namespace].initContainers.requests.memory += parseToInt(docResources[document].spec.template.spec.initContainers[initContainers].resources.requests.memory)
//     }

console.log(totalResources)




// console.log(docLimits[0].namespace)
