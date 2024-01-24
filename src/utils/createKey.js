export const createKey = () => {
  const charts =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const minLength = 5;
  const maxLength = 7;
  let key = "";

  const keyLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  for (let i = 0; i < keyLength; i++) {
    const index = Math.floor(Math.random() * charts.length);
    key += charts.charAt(index);
  }

  return key;
};
