const fs = require('fs');
const path = require('path');
const reads = path.join(__dirname, 'secret-folder');
const sOut = process.stdout;
fs.readdir(reads, { withFileTypes: true }, (err, fl) => {
  fl.forEach(key => {
    if (key.isFile()) {
      let name = key.name;
      let spl = name.split('.');
      fs.stat(path.join(__dirname, 'secret-folder', name), (err, st) => {
        let str = spl[0] + ' - ' + spl[1] + ' - ' + (st.size / 1024).toFixed(3) + 'kb';
        sOut.write(str + '\n');
      });
    }
  });
});

