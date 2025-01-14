
const {  processWriteFilesInDirectory } = require('./libs/read-templates.js');








(async () => {
    await processWriteFilesInDirectory({
        srcDirectory: "./templates", 
        destDirectory: "./outputs", 
        secretDirectory: "./secrets"
      })
    
})();