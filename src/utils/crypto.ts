import CryptoJS from 'crypto-js';

export class CryptoUtils {
  static encrypt(text: string, password: string): string {
    return CryptoJS.AES.encrypt(text, password).toString();
  }

  static decrypt(ciphertext: string, password: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  static isValidPassword(
    encryptedData: string,
    password: string,
    expectedData: string
  ): boolean {
    try {
      const decrypted = this.decrypt(encryptedData, password);
      return decrypted === expectedData;
    } catch {
      return false;
    }
  }
}