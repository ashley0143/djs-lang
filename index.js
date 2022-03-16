//Ty to a qt
const Discord =  require('discord.js')
const { readFileSync, writeFileSync } = require ("node:fs")
const { spawn } = require('node:child_process')

const keys = Object.keys(Discord).join(',\n');

const p = JSON.parse(readFileSync('./package.json', 'utf-8'));

let code = readFileSync('./index.djs', 'utf-8');

code = p.type === 'module'
  ? `import { ${keys} } from 'discord.js';\n${code}`
  : `const { ${keys} } = require('discord.js');\n${code}`;

const fileName = `${Date.now()}.js`;

writeFileSync(`./${fileName}`, Buffer.from(code));

const node = spawn('node', [fileName]);

node.stdout.on('data', (data) => console.log(data.toString()));
node.stderr.on('data', (data) => console.error(data.toString()));
node
  .on('error', (err) => console.error(err))
  .on('close', (code_) => console.log(`Process exited with exit code ${code_}`));
