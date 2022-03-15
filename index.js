import Discord from 'discord.js';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { inspect } from 'node:util';

const keys = Object.keys(Discord).join(',\n');

let code = readFileSync('./index.djs', 'utf-8');

code = inspect(
  `if (typeof require !== 'undefined') {
     const { ${keys} = require('discord.js');

     ${code}
   } else {
     import { ${keys} } from 'discord.js';

     ${code}
   }`
);

const fileName = `${Date.now()}.js`;

execSync(`touch ${fileName} && ${code} > ${fileName} && node ${fileName}`);
