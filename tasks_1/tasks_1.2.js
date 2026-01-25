let str = prompt("введите число:");

if (isNaN(str)) {
  console.log("не число");
} else if (str % 2 === 0) {
  console.log("число четное");
} else {
  console.log("число нечетное");
}
