const fs = require('fs');
const path = require('path');
const styles = path.join(__dirname, 'styles');

const { pipeline } = require('stream');
const bund = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
});


const folder = path.join(__dirname, 'assets');
const folder2 = path.join(__dirname, 'project-dist/assets');
folders(folder, folder2);

async function folders(folder, folder2) {
  await fs.promises.rm(folder2, { recursive: true, force: true });

  await fs.promises.mkdir(folder2, { recursive: true });
  const reads = await fs.promises.readdir(folder, { withFileTypes: true });
  for (let file of reads) {
    if (file.isDirectory()) {
      folders(path.join(folder, `${file.name}`), path.join(folder2, `${file.name}`));
    } else {
      await fs.promises.copyFile(path.join(folder, `${file.name}`), path.join(folder2, `${file.name}`));
    }
  }
}

function create() {
  fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });
  fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
  fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

}

async function reads() {
  fs.readdir(styles, { withFileTypes: true }, (err, fl) => {
    if (err) {
      throw err;
    }
    fl.forEach(key => {
      if (key.isFile()) {
        let names = path.extname(key.name).slice(1);
        if (names == 'css') {
          const rea = fs.createReadStream(path.join(__dirname, 'styles', key.name));
          wr(rea);
        }
      }
    });

  });
}

async function wr(rea) {
  pipeline(rea, bund, (err) => {
    if (err) {
      throw err;
    }
  }
  );
}

async function copyHTML() {
  const bundlePath = path.join(__dirname, 'project-dist');
  const templatePath = path.join(__dirname, 'template.html');
  const componentPath = path.join(__dirname, 'components');
  let template = await fs.promises.readFile(templatePath, 'utf-8');
  let namePath = path.join(__dirname, 'project-dist');
  const files = await fs.promises.readdir(componentPath, { withFileTypes: true });
  for (let file of files) {
    const ext = path.extname(file.name);
    if (file.isFile() && ext === '.html') {
      const name = path.basename(file.name, ext);
      const data = await fs.promises.readFile(path.join(componentPath, file.name), 'utf8');
      template = template.replace(`{{${name}}}`, data);
    }
  }
  await fs.promises.writeFile(path.join(namePath, 'index.html'), template, 'utf8');
  console.log(template);
}

copyHTML();

create();
reads();
