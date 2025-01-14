const fs = require('fs');
const fs_promises = fs.promises

const readTemplate = (path) => {
    try {
        const data = fs.readFileSync(path, 'utf8');
        console.log('data', data);
    } catch (err) {
        console.error('Error:', err);
    }
}

async function listFilesInDirectory(directory) {
  try {
    const entries = await fs_promises.readdir(directory, { withFileTypes: true });
    
    const promises =  entries.map( async (entry) => {
      const fullPath = `${directory}/${entry.name}`;
      if (entry.isFile()) {
        return entry.name;
      }
      
      return await listFilesInDirectory(fullPath)
    })

    const files = await Promise.all(promises);
    return {
      directory,
      files
    };
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}






module.exports = { readTemplate, listFilesInDirectory };