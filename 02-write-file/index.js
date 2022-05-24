const fs = require('fs');
const path = require('path');
const sIn = process.stdin;
const sOut = process.stdout;
const reads = fs.createWriteStream(path.join(__dirname, 'text.txt'));
sOut.write('Введите текст \n');
sIn.on('data', data => {
  if (data.toString().trim() == 'exit') {
    sOut.write('Запись завершена \n');
    sOut.write('goodbye');
    process.exit();
  }
  reads.write(data);
});

process.on('SIGINT', () => {
  sOut.write('Запись завершена \n');
  sOut.write('goodbye');
  process.exit();
});
