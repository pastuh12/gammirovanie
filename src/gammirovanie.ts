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
    const keyArray = textArray.map((s, index) => String.fromCodePoint((s.charCodeAt(0) + index) % 33));

    let resultText = '';

    let bitsPast = 0;
    let keyBits = '';
    keyArray.forEach((char) => {
      let keyCharBits = this.alf.indexOf(char).toString(2);
      while (keyCharBits.length !== 6) {
        keyCharBits = '0' + keyCharBits;
      }

      keyBits += keyCharBits;
    });
    textArray.forEach((char) => {
      let charBits = this.alf.indexOf(char).toString(2);
      while (charBits.length !== 6) {
        charBits = '0' + charBits;
      }

      let encodedCharBits = '';
      charBits.split('').forEach((bit, index) => {
        encodedCharBits += +bit ^ +keyBits[(index + bitsPast) % keyBits.length];
      });
      bitsPast += charBits.length;

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
}
