import { Gammirovanie } from './gammirovanie';

const gammirovanie = new Gammirovanie();

const codeByMod2 = gammirovanie.encryptByMod2('прочитайтепрошифры', 'тест');
const codeCodeByMod2 = gammirovanie.encryptByMod2('эуэжшупчааюаюсчваю', 'тест');

console.log({ codeByMod2, codeCodeByMod2 });
