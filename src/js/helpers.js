//Допоміжні функції
export function totalCart(array) {
  let total = 0;
  array.map(arr => (total += arr.price));
  return total;
}
