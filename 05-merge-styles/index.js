const fs = require('fs');
const path = require('path');

require('events').EventEmitter.defaultMaxListeners = Infinity;
async function readCopy() {
  const stylesPath = path.join(__dirname, 'styles');
  const styles = await fs.promises.readdir(stylesPath, { withFileTypes: true });
  for (let style of styles) {
    const ext = path.extname(style.name);
    if (style.isFile() && ext === '.css') {
      let data = fs.createReadStream(path.join(stylesPath, style.name));
      let bund = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), { flags: 'a' });
      await Promise.resolve().then(() => {
        data.pipe(bund);
      });
    }
  }
}


readCopy();