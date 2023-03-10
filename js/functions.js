const checkLengthString = (string, length) => string.length <= length;

checkLengthString('проверяемая строка', 20);
checkLengthString('проверяемая строка', 18);
checkLengthString('проверяемая строка', 10);

const isPalindrome = (string) => {
  const stringForCheck = string.toLowerCase().replaceAll(' ', '');
  const lastIndex = stringForCheck.length - 1;

  for (let i = 0; i < stringForCheck.length / 2; i++) {
    if (stringForCheck[i] !== stringForCheck[lastIndex - i]) {
      return false;
    }
  }
  return true;
};

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');

const getNumber = (string) => {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
};

getNumber('2023 год');
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber('агент 007');
getNumber('а я томат');
getNumber('2023');
getNumber('-1');
getNumber('1.5');

const padStart = (string, targetLength, addSymbols) => {
  let result = string;
  const actualLength = targetLength - string.length;
  if (string.length < targetLength) {
    result = addSymbols.slice(0, actualLength % addSymbols.length) + addSymbols.repeat(actualLength / addSymbols.length) + result;
  }
  return result;
};

padStart('1', 2, '0');
padStart('1', 4, '0');
padStart('q', 4, 'werty');
padStart('q', 4, 'we');
padStart('qwerty', 4, '0');
