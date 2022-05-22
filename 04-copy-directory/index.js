const fs = require('fs');
const path = require('path');
const newDirectory = path.join(__dirname, 'files-copy');
const directory = path.join(__dirname, 'files');
const sOut = process.stdout;

fs.mkdir(newDirectory, { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
  sOut.write('Папка files-copy создана\n');

  fs.readdir(directory, (err, fl) => {
    for (let key of fl) {
      const olds = path.join(__dirname, 'files', key);
      const news = path.join(__dirname, 'files-copy', key);
      fs.copyFile(olds, news, (err) => {
        if (err) {
          throw err;
        }
      });
    }
    sOut.write('Копирование завершено');
  });
});

