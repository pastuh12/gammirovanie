// todo refactor

export class Gammirovanie {
  private readonly alf = [
    ' ',
    'а',
    'б',
    'в',
    'г',
    'д',
    'е',
    'ё',
    'ж',
    'з',
    'й',
    'и',
    'к',
    'л',
    'м',
    'н',
    'о',
    'п',
    'р',
    'с',
    'т',
    'у',
    'ф',
    'х',
    'ц',
    'ч',
    'ш',
    'щ',
    'ъ',
    'ы',
    'ь',
    'э',
    'ю',
    'я',
  ];
  // encrypt(text: string, key: string): string {
  //   this.produceGammirovanie(text, key);

  //   return '';
  // }

  encryptByModN(text: string, key: string): string {
    const keyLength = key.length;

    const textArray = text.split('');
    const keyArray = key.split('');

    let resultText = '';

    textArray.forEach((char, index) => {
      const charNumber = this.alf.indexOf(char);
      const keyChar = keyArray[index % keyLength];
      const keyCharNumber = this.alf.indexOf(keyChar);

      const encodeCharNumber = (charNumber + keyCharNumber) % this.alf.length;
      const encodeChar = this.alf[encodeCharNumber];

      resultText += encodeChar;
    });

    return resultText;
  }

  encryptByMod2(text: string, key: string): string {
    const textArray = text.split('');
    const keyArray = key.split('');

    let resultText = '';

    let bitsPast = 0;
    let keyBits = '';
    keyArray.forEach((char) => {
      let keyCharBits = this.alf.indexOf(char).toString(2);
      while (keyCharBits.length !== 6) {
        keyCharBits = '0' + keyCharBits;
      }

      console.log({ keyCharBits });

      keyBits += keyCharBits;
    });
    textArray.forEach((char) => {
      let charBits = this.alf.indexOf(char).toString(2);
      while (charBits.length !== 6) {
        charBits = '0' + charBits;
      }
      console.log({ charBits });

      let encodedCharBits = '';
      charBits.split('').forEach((bit, index) => {
        encodedCharBits += +bit ^ +keyBits[(index + bitsPast) % keyBits.length];
      });
      bitsPast += charBits.length;
      console.log({ encodedCharBits });

      const encodedCharNumber = parseInt(encodedCharBits, 2) % this.alf.length;
      const encodedChar = this.alf[encodedCharNumber];
      resultText += encodedChar;
    });

    return resultText;
  }

  decryptByModN(encryptText: string, key: string): string {
    const keyLength = key.length;

    const textArray = encryptText.split('');
    const keyArray = key.split('');

    let resultText = '';

    textArray.forEach((char, index) => {
      const charNumber = this.alf.indexOf(char);
      const keyChar = keyArray[index % keyLength];
      const keyCharNumber = this.alf.indexOf(keyChar);

      const decodeCharNumber = (charNumber - keyCharNumber + this.alf.length) % this.alf.length;
      const decodeChar = this.alf[decodeCharNumber];

      resultText += decodeChar;
    });

    return resultText;
  }

  // decryptByMod2(encryptText: string, key: string): string {
  //   const keyLength = key.length;

  //   const encryptTextArray = encryptText.split('');
  //   const keyArray = key.split('');

  //   let resultText = '';

  //   encryptTextArray.forEach((char, index) => {
  //     const charNumber = this.alf.indexOf(char);
  //     const keyChar = keyArray[index % keyLength];
  //     const keyCharNumber = this.alf.indexOf(keyChar);

  //     const charNumberBits = (charNumber >>> 0).toString(2);
  //     const keyCharNumberBits = (keyCharNumber >>> 0).toString(2);

  //     const charNumberBitsArray = charNumberBits.split('');
  //     const keyCharNumberBitsArray = keyCharNumberBits.split('');

  //     let encodeCharNumberBits = '';

  //     charNumberBitsArray.forEach((charBit, index) => {
  //       const result = +charBit ^ +keyCharNumberBitsArray[index % keyCharNumberBitsArray.length];

  //       encodeCharNumberBits += result.toString();
  //     });

  //     const encodeCharNumber = parseInt(encodeCharNumberBits, 2) % this.alf.length;

  //     resultText += this.alf[encodeCharNumber];
  //   });
  // }
}

/**  шаги
  1. Определяем алфавит
  2. Получаем открытый текст и гамму
  3. Получить размер ключа
  4. Обрабатываем каждый символ открытого текста
    4.1 Берем символ 
    4.2 Определяем символ-пару из гаммы
    4.3 Находим номера этих символов в алфавите
    4.4 Переводим эти номера в двоичную запись
    4.5 Операцией xor получаем номер зашифрованного символа
    4.6 Остатком от деления находим символ, который пренадлежит получениму шифр-номеру
    4.7 Добавляем зашифрованный символ в шифр-текст
  5. Вывводим зашифрованный текст
*/
