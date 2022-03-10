const fs = require("fs");
const yaml = require("js-yaml");
const YAML = require("js-yaml");
const resourceChecker = require("resource-checker");
const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
const docLimits = yaml.load(fs.readFileSync(myArgs[0]));
const docResources = YAML.loadAll(fs.readFileSync(myArgs[1]));

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
else if (totalR.requests.cpu > totalLimits.requests.cpu){
    var c = totalResources.requests.cpu - totalLimits.requests.cpu
    console.log(`Cpu request is ${c} CPU is too high`)
    process.exit(1)
}
else if (totalR.requests.memory > totalLimits.requests.memory){
    var d = totalResources.requests.memory - totalLimits.requests.memory
    console.log(`Memory is ${d} too high!`)
    process.exit(1)
}
else {console.log(`Total minimum requirements OK!`)
process.exit(0)
}}


for(let document in docResources){
    for (let container in docResources[document].spec.template.spec) {
            console.log(docResources[document].spec.template.spec.containers[container])
            totalResources.containers.limits.cpu += parseToInt(docResources[document].spec.template.spec.containers.resources[container].limits.cpu)
            totalResources.containers.requests.cpu += parseToInt(docResources[document].spec.template.spec.containers.resources[container].requests.cpu)
    }
    for (let initcontainer in docResources[document].spec.template.spec.initcontainers) {
        totalResources.initContainers.limits.cpu += parseToInt(docResources[document].spec.template.spec.initcontainers.resources[initcontainer].limits.cpu)
        totalResources.initContainers.requests.cpu += parseToInt(docResources[document].spec.template.spec.initcontainers.resources[initcontainer].requests.cpu)
    }
    for (let container in docResources[document].spec.template.spec.containers) {
        totalResources.containers.limits.memory += parseToInt(docResources[document].spec.template.spec.containers.resources[container].limits.memory)
        totalResources.containers.requests.memory += parseToInt(docResources[document].spec.template.spec.containers.resources[container].requests.memory)
    }
    for (let initcontainers in docResources[document].spec.template.spec.initcontainers) {
        totalResources.initcontainers.limits.memory += parseToInt(docResources[document].spec.template.spec.initcontainers.resources[initcontainer].limits.memory)
        totalResources.initcontainers.requests.memory += parseToInt(docResources[document].spec.template.spec.initcontainers.resources[initcontainer].requests.memory)
    }
for(var i = 0; i <individualContainers.length; i++){
    if(individualContainers[i].namespace === cars.value) {

    }
   }
  }
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
        cpu: docLimits.total.limit.cpu,
        memory: docLimits.total.limit.mem
    },
    requests: {
        cpu: docLimits.total.request.cpu,
        memory: docLimits.total.request.mem
    }
};
let individualContainersRes = {}
for (let document in docResources) {
    if (!individualContainersRes[docResources[document].metadata.namespace]) {
        individualContainersRes[docResources[document].metadata.namespace] = {
            totals: {
                limits: {
                    cpu: 0,
                    memory: 0
                },
                requests: {
                    cpu: 0,
                    memory: 0
                }
            },
            containers: {
                limits: {
                    cpu: 0,
                    memory: 0
                },
                requests: {
                    cpu: 0,
                    memory: 0
                }
            },
            initContainers: {
                limits: {
                    cpu: 0,
                    memory: 0
                },
                requests: {
                    cpu: 0,
                    memory: 0
                }
            }

        }
    } 
}



