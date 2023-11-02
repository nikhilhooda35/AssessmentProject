const CryptoJS = require("crypto-js");

export const getHashWithSHA256 = (plainText) => {
  const hash = CryptoJS.SHA256(plainText);
  return hash.toString(CryptoJS.enc.Hex);
};
