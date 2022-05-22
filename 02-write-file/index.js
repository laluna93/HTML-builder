const fs = require('fs');
const path = require('path');
const sIn = process.stdin;
const sOut = process.stdout;
const reads = fs.createWriteStream(path.join(__dirname, 'text.txt'));
sOut.write('Ваш текст \n');
sIn.on('data', data => {
  if (data.toString().trim() == 'exit') {
    sOut.write('Запись завершена \n');
    sOut.write('bye');
    process.exit();
  }
  reads.write(data);
});

process.on('SIGINT', () => {
  sOut.write('Запись завершена \n');
  sOut.write('Bye Bye');
  process.exit();
});
