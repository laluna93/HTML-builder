const fs = require('fs');
const path = require('path');
const styles = path.join(__dirname, 'styles');
const bund = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
const { pipeline } = require('stream');
async function readCopy() {
  fs.readdir(styles, { withFileTypes: true }, (err, fl) => {
    fl.forEach(el => {
      if (el.isFile()) {
        let file = el.name.split('.');
        if (file[1] == 'css') {
          let str = file.join('.');
          console.log(str);
          const reads = fs.createReadStream(path.join(__dirname, 'styles', str), 'utf8');
          aWait(reads);
          console.log(str);
          reads.on('data', (data) => {
            console.log(data);
          }
          );
        }
      }
    });
  });
}
async function aWait(reads) {
  await pipeline(reads, bund, (err) => {
    if (err) {
      throw err;
    }
    console.log('awayt');
  }
  );
}

readCopy();