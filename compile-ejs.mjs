import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.join(__dirname, 'public');
const outputDir = path.join(__dirname, 'public');

function compileEjs() {
  fs.readdir(inputDir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      if (path.extname(file) === '.ejs') {
        const filePath = path.join(inputDir, file);
        const outputFilePath = path.join(outputDir, file.replace('.ejs', '.html'));

        ejs.renderFile(filePath, {}, (err, str) => {
          if (err) throw err;
          fs.writeFileSync(outputFilePath, str);
        });
      }
    });
  });
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

compileEjs();
