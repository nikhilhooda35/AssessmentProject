const CryptoJS = require("crypto-js");

export const getEncryptedValue = (value) => {
  let key = "0123456789123456";
  let iv = getRandomString(16);
  let ciphertext = encrypt(iv, key, value);
  let ciphertextConversion = ciphertext + ":" + iv;
  //
  let encyrptedValue = btoa(ciphertextConversion);
  //
  return encyrptedValue;
};

const getRandomString = (length) => {
  let randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
};

const encrypt = (iv, passPhrase, plainText) => {
  let encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(plainText),
    CryptoJS.enc.Utf8.parse(passPhrase),
    {
      iv: CryptoJS.enc.Utf8.parse(iv),
      keySize: 128 / 8,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encrypted;
};

export const getDecryptedValue = (val) => {
  let key = "0123456789123456";
  let encryptedVal = atob(val);
  let decyrptedValue = decrypt(
    encryptedVal.split(":")[1],
    encryptedVal.split(":")[0],
    key
  );
  return decyrptedValue;
};

const decrypt = (iv, encText, key) => {
  let decrypt = CryptoJS.AES.decrypt(encText, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    keySize: 128 / 8,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
  return decrypt;
};

export const getEncryptedValueWithHash = (plaintext, salt) => {
  let hash = CryptoJS.SHA256(plaintext);
  hash = hash.toString(CryptoJS.enc.Hex);
  hash = hash + salt;
  hash = CryptoJS.SHA256(hash);
  hash = hash.toString(CryptoJS.enc.Hex);
  return hash;
};
