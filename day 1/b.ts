const input = await Bun.file("input.txt").text();

// console.log(input.split("\n"));

// regex find letters `one` or `two` or `three` or `four` or `five` or `six` or `seven` or `eight` or `nine` or digit
const REGEX = /one|two|three|four|five|six|seven|eight|nine|\d/;

// reversed regex
const REVERSED_REGEX = /eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|\d/;

const convertToDigit = (word: string) => {
  switch (word) {
    case "one":
    case "eno":
      return "1";
    case "two":
    case "owt":
      return "2";
    case "three":
    case "eerht":
      return "3";
    case "four":
    case "ruof":
      return "4";
    case "five":
    case "evif":
      return "5";
    case "six":
    case "xis":
      return "6";
    case "seven":
    case "neves":
      return "7";
    case "eight":
    case "thgie":
      return "8";
    case "nine":
    case "enin":
      return "9";
    default:
      return word;
  }
}

const result = input.split("\n").reduce((acc, curr) => {

  // find first digit in curr
  const firstDigit = curr.match(REGEX);

  // reverse curr
  const reversedCurr = curr.split("").reverse().join("");

  // find last digit in curr
  const lastDigit = reversedCurr.match(REVERSED_REGEX);
  
  return acc + parseInt(`${convertToDigit(firstDigit?.toString() ?? '')}${convertToDigit(lastDigit?.toString() ?? '')}`);
}, 0);

console.log(result);
