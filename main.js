const Handlebars = require("handlebars");

const { readJson } = require("./libs/read-json");
const { readTemplate, listFilesInDirectory } = require('./libs/read-templates.js');

// const template = Handlebars.compile("Name: {{name}} - Age: {{age}}");
// console.log(template({ name: "Nils", age: 30 }));






(async () => {
    readJson("./variables/node-app.json")
    readTemplate("./templates/node-app.yml.template")
    const results =  await listFilesInDirectory("./templates")
    console.log("All results:",JSON.stringify(results, null, 2) );
})();