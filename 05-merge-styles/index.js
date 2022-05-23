const fs = require('fs');
const path = require('path');
const styles = path.join(__dirname, 'styles');
const bund = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
const { pipeline } = require('stream');
require('events').EventEmitter.defaultMaxListeners = Infinity;
async function readCopy() {
  fs.readdir(styles, { withFileTypes: true }, (err, fl) => {
    if (err) {
      throw err;
    }
    fl.forEach(el => {
      if (el.isFile()) {
        let file = path.extname(el.name).slice(1);
        if (file == 'css') {
          const reads = fs.createReadStream(path.join(__dirname, 'styles', el.name), 'utf8');
          createBundle(reads);
        }
      }
    });
  });
}
async function createBundle(reads) {
  pipeline(reads, bund, (err) => {
    if (err) {
      throw err;
    }
  }
  );

}

readCopy();