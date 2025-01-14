
const {  processWriteFilesInDirectory } = require('./libs/templates.js');








(async () => {
    await processWriteFilesInDirectory({
        srcDirectory: "./templates", 
        destDirectory: "./outputs", 
        secretDirectory: "./secrets"
      })
    
})();