//console.log('Hello TypeScript');
//const a: number = 1;
/*
let sum: (arg1: number, arg2?: number, arg3?: number) => number;

sum = function (a, b, c) {
  return a + (b ?? 0) + (c ?? 0);
};
console.log(sum(1, 2));

interface Sum {
  (a: number, b: number): number;
}
const sum: Sum = (a, b) => {
  return a + b;
};
console.log(sum(1, 2));
*/

interface Person {
  name: string;
  age: number;
}

interface Me extends Person {
  phone: string;
}

const me: Me = {
  name: 'hanby',
  age: 23,
  phone: '010-xxxx-xxxx',
};

console.log(me);
