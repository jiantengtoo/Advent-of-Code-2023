const input = await Bun.file("input.txt").text();

type NumberRepresentation = {
  number: number;
  coordinates: Array<number[]>; // [row, column]
}

const numberRepresentations: NumberRepresentation[] = [];

type SymbolRepresentation = {
  symbol: string;
  coordinates: number[]; // [row, column]
}

const symbolsCoordinates: Array<SymbolRepresentation> = [];

let tempStringNumber = "";

const stringNumberCoordinates: number[][] = [];

input.split("\n").forEach((line, rowIndex) => {
  line.split("").forEach((char, columnIndex) => {
    if (!isNaN(parseInt(char))) {
      tempStringNumber += char;
      stringNumberCoordinates.push([rowIndex, columnIndex]);
    } else if (char === ".") {
      if (tempStringNumber.length) {        
        numberRepresentations.push({
          number: parseInt(tempStringNumber),
          coordinates: [...stringNumberCoordinates]
        });
        tempStringNumber = "";

        stringNumberCoordinates.length = 0;
      }
    } else {
      symbolsCoordinates.push({
        symbol: char,
        coordinates: [rowIndex, columnIndex]
      });
      if (tempStringNumber.length) {        
        numberRepresentations.push({
          number: parseInt(tempStringNumber),
          coordinates: [...stringNumberCoordinates]
        });
        tempStringNumber = "";

        stringNumberCoordinates.length = 0;
      }
    }
  });
});

let result = 0;

symbolsCoordinates.forEach((symbolCoordinate) => {
  if (symbolCoordinate.symbol !== '*') return;

  const { coordinates } = symbolCoordinate;

  const surroundingCoordinates: number[][] = [
    [coordinates[0] - 1, coordinates[1]],
    [coordinates[0] + 1, coordinates[1]],
    [coordinates[0], coordinates[1] - 1],
    [coordinates[0], coordinates[1] + 1],
    // diagonals
    [coordinates[0] - 1, coordinates[1] - 1],
    [coordinates[0] + 1, coordinates[1] + 1],
    [coordinates[0] - 1, coordinates[1] + 1],
    [coordinates[0] + 1, coordinates[1] - 1],
  ];

  const surroundingNumbers: NumberRepresentation[] = [];

  surroundingCoordinates.forEach((coordinates) => {
    // check if coordinates are in numberRepresentations coordinates
    const numberRepresentation = numberRepresentations.find((numberRepresentation) => {
      return numberRepresentation.coordinates.some((coordinate) => {
        return coordinate[0] === coordinates[0] && coordinate[1] === coordinates[1];
      });
    });

    if (numberRepresentation) {
      // if numberRepresentation is found, push it to surroundingNumbers
      // but only if it's not already in there
      if (surroundingNumbers.some((surroundingNumber) => surroundingNumber.number === numberRepresentation.number)) return;
      surroundingNumbers.push(numberRepresentation);
    }
  });

  if (surroundingNumbers.length === 2) {
    result += surroundingNumbers[0].number * surroundingNumbers[1].number;
  }

})

console.log(result);
