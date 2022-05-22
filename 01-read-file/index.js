const fs = require('fs');
const path = require('path');
const reads = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');
reads.on('data', (data) => console.log(data));