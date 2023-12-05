const input = await Bun.file("input.txt").text();

const TOTAL_CARD = 223; // get this number of input.txt

const TOTAL_CARD_ARRAY = Array.from({ length: TOTAL_CARD }, (_) => 1);

input.split("\n").forEach((curr, index) => {
  const [, numbersSet] = curr.split(":");
  const [winningNumbers, tryToMatchNumbers] = numbersSet.split("|");

  const winningNumbersArray = winningNumbers.split(" ").map((n) => parseInt(n)).filter((n) => !isNaN(n));
  const tryToMatchNumbersArray = tryToMatchNumbers.split(" ").map((n) => parseInt(n)).filter((n) => !isNaN(n));

  const points = winningNumbersArray.reduce((acc2, curr2) => {
    if (tryToMatchNumbersArray.includes(curr2)) {
      if (acc2 === 0) return 1;
      return acc2 + 1;
    }

    return acc2;
  }, 0);

  Array.from({length: TOTAL_CARD_ARRAY[index]}).forEach(() => {
    Array.from({ length: points }, (_, i) => {
      TOTAL_CARD_ARRAY[i + index + 1] = TOTAL_CARD_ARRAY[i + index + 1] + 1;
    });
  });
});

// console.log(TOTAL_CARD_ARRAY);

const sum = TOTAL_CARD_ARRAY.reduce((acc, curr) => acc + curr, 0);
console.log(sum);
