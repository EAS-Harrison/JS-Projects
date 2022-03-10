const fs = require("fs");
const yaml = require("js-yaml");
const YAML = require("js-yaml");
const resourceChecker = require("resource-checker");
const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
const docLimits = yaml.load(fs.readFileSync(myArgs[0]));
const docResources = YAML.loadAll(fs.readFileSync(myArgs[1]));

    
    
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
}
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
 }




