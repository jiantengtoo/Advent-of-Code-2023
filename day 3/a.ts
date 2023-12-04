const input = await Bun.file("input.txt").text();

type NumberRepresentation = {
  number: number;
  coordinates: Array<number[]>; // [row, column]
}

const numberRepresentations: NumberRepresentation[] = [];

const symbolsCoordinates: Array<number[]> = [];

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
      symbolsCoordinates.push([rowIndex, columnIndex]);
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


const result = numberRepresentations.reduce((acc, numberRepresentation) => {
  const { number, coordinates: numberRepresentationCoordinates } = numberRepresentation;

  // check if coordinates, surrounding coordinates contains symbols
  const surroundingCoordinates = numberRepresentationCoordinates.map(([row, column]) => {
    return [
      [row - 1, column - 1],
      [row - 1, column],
      [row - 1, column + 1],
      [row, column - 1],
      [row, column + 1],
      [row + 1, column - 1],
      [row + 1, column],
      [row + 1, column + 1],
    ];
  })
  .map((coordinates) => {
    return coordinates.filter(([row, column]) => {
      return row >= 0 && column >= 0;
    });
  })
  .map((coordinates) => {
    return coordinates.filter(([row, column]) => {
      return !numberRepresentationCoordinates.some(([numberRow, numberColumn]) => {
        return row === numberRow && column === numberColumn;
      });
    });
  })
  .flat();

  const hasSurroundingSymbols = surroundingCoordinates.some(([row, column]) => {
    return symbolsCoordinates.some(([symbolRow, symbolColumn]) => {
      return row === symbolRow && column === symbolColumn;
    });
  });

  if (hasSurroundingSymbols) {    
    return acc + number;
  }

  return acc;
}, 0);

console.log(result);
