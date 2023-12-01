const input = await Bun.file("input.txt").text();

// console.log(input.split("\n"));

const result = input.split("\n").reduce((acc, curr) => {

  // find first digit in curr
  const firstDigit = curr.match(/\d/);

  // reverse curr
  const reversedCurr = curr.split("").reverse().join("");

  // find last digit in curr
  const lastDigit = reversedCurr.match(/\d/);

  return acc + parseInt(`${firstDigit}${lastDigit}`);
}, 0);

console.log(result);
