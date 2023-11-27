import { Gammirovanie } from 'gammirovanie';

const gammirovanie = new Gammirovanie();

describe('Tests for Gammirovanie', () => {
  describe('Test class Gammirovanie', () => {
    it('check class existing', () => {
      expect(gammirovanie).toBeDefined();
      expect(gammirovanie).toBeInstanceOf(Gammirovanie);
    });
    it('checks the existence of the encrypt method', () => {
      expect(gammirovanie.encryptByMod2).toBeDefined();
      expect(gammirovanie.decryptByModN).toBeDefined();
      expect(gammirovanie.decryptByModN).toBeDefined();
    });
  });

  describe('Testing encryption by mod n', () => {
    const openText = 'прочитайтепрошифры';
    const key = 'тест';

    it('must return string', () => {
      const code = gammirovanie.encryptByModN(openText, key);
      expect(typeof code).toBe('string');
    });
    it('check that encode text decrypt in open text ', () => {
      const code = gammirovanie.encryptByModN(openText, key);
      const decodeText = gammirovanie.decryptByModN(code, key);

      expect(decodeText).toBe('прочитайтепрошифры');
    });
  });

  describe('Testing encryption by mod 2', () => {
    const openText = 'прочитайтепрошифры';
    const key = 'тест';

    it('must return string', () => {
      const code = gammirovanie.encryptByMod2(openText, key);
      expect(typeof code).toBe('string');
    });
    it('check that encode text decrypt in open text', () => {
      const code = gammirovanie.encryptByMod2(openText, key);
      const decodedText = gammirovanie.encryptByMod2(code, key);

      expect(decodedText).toBe(openText);
    });
  });
});
