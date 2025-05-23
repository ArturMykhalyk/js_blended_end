//Допоміжні функції
function totalCart(array) {
  let total = 0;
  array.map(arr => (total += arr.price));
  return total;
}
export { totalCart };
