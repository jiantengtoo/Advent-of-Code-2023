const input = await Bun.file("input.txt").text();

const RED_CONSTRAINT = 12;
const GREEN_CONSTRAINT = 13;
const BLUE_CONSTRAINT = 14;

const result = input.split("\n").reduce((acc, curr, index) => {
  // split by :
  const [, setsOfCubes] = curr.split(":");

  // split by ;
  const sets = setsOfCubes.split(";");

  const isImpossible = sets.some((set) => {
    return set.split(",").some((cubes) => {
      const [, number, color] = cubes.split(" ");
      
      switch (color) {
        case "red":
          return parseInt(number) > RED_CONSTRAINT;
        case "green":
          return parseInt(number) > GREEN_CONSTRAINT;
        case "blue":
          return parseInt(number) > BLUE_CONSTRAINT;
        default:
          return false;
      }
    })
  });
  
  if (isImpossible) return acc;  

  return acc + index + 1;
}, 0);

console.log(result);
