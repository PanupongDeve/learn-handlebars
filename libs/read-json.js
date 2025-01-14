const fs = require('fs');


const readJson = (path) => {
    try {
        const data = fs.readFileSync(path, 'utf8');
        const jsonObject = JSON.parse(data);
        console.log('Parsed JSON object:', jsonObject);
    } catch (err) {
        console.error('Error:', err);
    }
}

module.exports = { readJson };