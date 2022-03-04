let counter = 0;

const increment = () => {
  counter += 1;
  console.log(counter);
}

setInterval(increment, 1000); // every 1s

// An example of how to use readline
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('What is your favorite food? ', (answer) => {
//   console.log(`Oh, so your favorite food is ${answer}`);
// });