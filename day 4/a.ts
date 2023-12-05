const input = await Bun.file("input.txt").text();

const result = input.split("\n").reduce((acc, curr) => {
  const [, numbersSet] = curr.split(":");
  const [winningNumbers, tryToMatchNumbers] = numbersSet.split("|");

  const winningNumbersArray = winningNumbers.split(" ").map((n) => parseInt(n)).filter((n) => !isNaN(n));
  const tryToMatchNumbersArray = tryToMatchNumbers.split(" ").map((n) => parseInt(n)).filter((n) => !isNaN(n));

  const points = winningNumbersArray.reduce((acc2, curr2) => {
    if (tryToMatchNumbersArray.includes(curr2)) {
      if (acc2 === 0) return 1;
      return acc2 * 2;
    }

    return acc2;
  }, 0);  

  return acc + points;
}, 0);

console.log(result);
