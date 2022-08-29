export const isAnagram = (str1, str2) => {
  if (str1.length !== str2.length) {
    return false;
  }
  if (str1 === str2) {
    return true;
  }
  const array1 = str1.split("");
  const array2 = str2.split("");
  array1.forEach((letter) => {
    const index = array2.indexOf(letter);
    if (index > -1) {
      array2.splice(index, 1);
    }
  });
  return array2.length === 0;
};
