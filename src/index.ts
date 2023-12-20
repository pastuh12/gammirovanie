import { Gammirovanie } from './gammirovanie';

const gammirovanie = new Gammirovanie();

const openText = 'прочитайтепрошифры';

const key = openText
  .split('')
  .map((s, index) => String.fromCodePoint((s.charCodeAt(0) + index) % 33))
  .join('');

const codeByMod2 = gammirovanie.encryptByMod2(openText, key);
const codeCodeByMod2 = gammirovanie.encryptByMod2(codeByMod2, key);

console.log({ codeByMod2, codeCodeByMod2 });
