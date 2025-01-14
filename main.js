const Handlebars = require("handlebars");

const { readJson } = require("./libs/read-json");
const { readTemplate, listFilesInDirectory, processWriteFilesInDirectory } = require('./libs/read-templates.js');

// const template = Handlebars.compile("Name: {{name}} - Age: {{age}}");
// console.log(template({ name: "Nils", age: 30 }));






(async () => {
    // readJson("./variables/node-app.json")
    // readTemplate("./templates/node-app.yml")
    const results =  await processWriteFilesInDirectory("./templates", "./outputs")
    
})();