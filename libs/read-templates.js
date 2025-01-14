const fs = require('fs');
const path = require('path');
const fs_promises = fs.promises


async function readTemplate(filePath) {
  try {
    const data = await fs_promises.readFile(filePath, 'utf8');
    return data;
  } catch (err) {
      console.error('Error Reading Template:', err);
  }
}

async function writeOutput(filePath, data) {
  try {
    // Create the directory if it doesn't exist
    fs_promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs_promises.writeFile(filePath, data, 'utf8');
  } catch (err) {
      console.error('Error Write Output:', err);
  }
}


async function processWriteFilesInDirectory(srcDirectory, destDirectory) {
  try {
    const entries = await fs_promises.readdir(srcDirectory, { withFileTypes: true });
    entries.forEach(async (entry) => {
      const fullPathRead = `${srcDirectory}/${entry.name}`;
      const fullPathWrite = `${destDirectory}/${entry.name}`;
      if (entry.isFile()) {
        console.log('File:', fullPathRead);
        await processWriteFile(srcDirectory, destDirectory, entry.name);
      } else if (entry.isDirectory()) {
        console.log('DirectoryRead:', fullPathRead);
        console.log('DirectoryWrite:', fullPathWrite);
        await processWriteFilesInDirectory(fullPathRead, fullPathWrite);
      }
    });
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}

async function processWriteFile(srcDirectory, destDirectory, filename) {
  const data = await readTemplate(`${srcDirectory}/${filename}`);
  await writeOutput(`${destDirectory}/${filename}`, data);
  
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






module.exports = { readTemplate, listFilesInDirectory, processWriteFilesInDirectory };