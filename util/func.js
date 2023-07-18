export const removeDupArObj = (x, key) => {
  const unique2 = x?.filter((obj, index) => {
    return index === x?.findIndex((o) => obj[key] === o[key]);
  });
  return unique2;
};
