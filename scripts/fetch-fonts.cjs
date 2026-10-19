const fs = require('node:fs');
const path = require('node:path');

const files = [
  ['dm-serif-display-regular.ttf', 'dmserifdisplay/DMSerifDisplay-Regular.ttf'],
  ['dm-serif-display-italic.ttf', 'dmserifdisplay/DMSerifDisplay-Italic.ttf'],
  ['dm-serif-display-OFL.txt', 'dmserifdisplay/OFL.txt'],
  ['manrope-variable.ttf', 'manrope/Manrope%5Bwght%5D.ttf'],
  ['manrope-OFL.txt', 'manrope/OFL.txt']
];

(async () => {
  const directory = path.join(__dirname, '..', 'assets', 'fonts');
  fs.mkdirSync(directory, { recursive: true });
  for (const [name, source] of files) {
    const response = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${source}`);
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    const data = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(path.join(directory, name), data);
    console.log(name, data.length);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
