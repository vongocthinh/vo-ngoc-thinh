const sum_to_n_a = (n) => {
  let res = 0;
  while (n > 0) {
    res += n;
    n = n - 1
  }
  return res;
}

const sum_to_n_b = (n) => {
  if (n === 1) return 1;
  return n + sum_to_n_b(n - 1);
}

const sum_to_n_c = (n) => {
  const listInput = [...Array(n).keys()].map(i => i + 1);
  const sum = listInput.reduce((x, y) => {
    return x + y
  },0);
  return sum;
}

console.log("execute sum_to_n_a", sum_to_n_a(100));
console.log("execute sum_to_n_a", sum_to_n_b(100));
console.log("execute sum_to_n_a", sum_to_n_c(100));