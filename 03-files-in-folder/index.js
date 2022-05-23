const fs = require('fs');
const path = require('path');
const reads = path.join(__dirname, 'secret-folder');
const sOut = process.stdout;
fs.readdir(reads, { withFileTypes: true }, (err, fl) => {
  let form;
  let names;
  fl.forEach(key => {
    if (key.isFile()) {
      fs.stat(path.join(__dirname, 'secret-folder', key.name), (err, st) => {
        form = path.extname(key.name).slice(1);

        names = path.parse(path.join(__dirname, 'secret-folder', key.name)).name;
        let str = names + ' - ' + form + ' - ' + (st.size / 1024).toFixed(3) + 'kb';

        sOut.write(str + '\n');
      });
    }
  });
});

