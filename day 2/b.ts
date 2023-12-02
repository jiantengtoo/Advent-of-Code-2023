const input = await Bun.file("input.txt").text();

const result = input.split("\n").reduce((acc, curr, ) => {
  // split by :
  const [, setsOfCubes] = curr.split(":");

  // split by ;
  const sets = setsOfCubes.split(";");

  let min_blue = 0;
  let min_red = 0;
  let min_green = 0;

  sets.forEach((set) => {
    set.split(",").forEach((cubes) => {
      const [, number, color] = cubes.split(" ");
      
      switch (color) {
        case "red":
          min_red = Math.max(min_red, parseInt(number));
          break;
        case "green":
          min_green = Math.max(min_green, parseInt(number));
          break;
        case "blue":
          min_blue = Math.max(min_blue, parseInt(number));
          break;
        default:
          break;
      }
    })
  });
  
  const power = min_blue * min_red * min_green;

  return acc + power;
}, 0);

console.log(result);
