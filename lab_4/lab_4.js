// // задание 1
// const peopleWaiting = [
//   "Кристина",
//   "Олег",
//   "Кирилл",
//   "Мария",
//   "Светлана",
//   "Артем",
//   "Глеб",
// ];

// const giveParcel = (queue) => {
//   const recipient = queue.shift();
//   alert(
//     `${recipient} получил(а) посылку. В очереди осталось ${queue.length} человек`,
//   );
// };

// const leaveQueueWithoutParcel = (queue) => {
//   const leaver = queue.pop();
//   alert(`${leaver} не получил(а) посылку и ушел(а) из очереди`);
// };

// giveParcel(peopleWaiting);
// giveParcel(peopleWaiting);
// giveParcel(peopleWaiting);

// while (peopleWaiting.length > 0) {
//   leaveQueueWithoutParcel(peopleWaiting);
// }

// // задание 2
// const getSumOfSequence = (number) => {
//   const sequnceArray = [];
//   for (let i = 1; i <= number; i++) {
//     sequnceArray.push(i);
//   }
//   const firstElement = sequnceArray[0];
//   const lastElement = sequnceArray[sequnceArray.length - 1];
//   const sum = firstElement + lastElement;
//   return sum;
// };

// const result = getSumOfSequence(5);
// console.log(`getSumOfSequence(5) = ${result}`);

// //задание 3
// const coffees = ["Latte", "Cappuccino", "Americano"];
// const coffeeName = prompt("Поиск кофе по названию");

// if (coffeeName !== null && coffeeName.trim() !== "") {
//   const index = coffees.findIndex(
//     (coffee) => coffee.toLowerCase() === coffeeName.toLowerCase(),
//   );
//   if (index !== -1) {
//     alert(
//       `Держите ваш любимый кофе ${coffees[index]}. Он ${index + 1}-й по популярности в нашей кофейне`,
//     );
//   } else {
//     alert(`К сожалению, такого вида кофе нет в наличии`);
//   }
// }

// //задание 4
// const prices = [1.5, 1, 2];
// const updatedPrices = prices.map((price) => {
//   return price + 0.5;
// });

// coffees.forEach((coffee, index) => {
//   const newPrice = updatedPrices[index];
//   alert(`Кофе ${coffee} сейчас стоит ${newPrice} евро`);
// });

// //задание 5
// const clientsEstimations = [];
// const askClientToGiveEstimation = () => {
//   const answer = Number(prompt("Как вы оцениваете нашу кофейню от 1 до 10?"));

//   if (!isNaN(answer) && answer >= 1 && answer <= 10) {
//     clientsEstimations.push(answer);
//   } else {
//     alert(`Некорректный ввод`);
//   }
// };

// for (let i = 0; i < 5; i++) {
//   askClientToGiveEstimation();
// }

// const goodEstimations = clientsEstimations.filter((answer) => {
//   return answer > 5;
// }).length;

// const notGoodEstimations = clientsEstimations.filter((answer) => {
//   return answer <= 5;
// }).length;

// alert(
//   `Всего положительных оценок ${goodEstimations}. Всего отрицательных оценок ${notGoodEstimations}`,
// );

// //задание 6
// const numbers = [10, 4, 100, -5, 54, 2];

// let sumFor = 0;
// for (let i = 0; i < numbers.length; i++) {
//   sumFor += numbers[i] ** 3;
// }
// console.log("Сумма кубов(for):", sumFor);

// let sumForOf = 0;
// for (const number of numbers) {
//   sumForOf += number ** 3;
// }
// console.log("Сумма кубов(for of):", sumForOf);

// let sumForEach = 0;
// numbers.forEach((number) => {
//   sumForEach += number ** 3;
// });
// console.log("Сумма кубов(forEach):", sumForEach);

// const sumReduce = numbers.reduce((accumulator, current) => {
//   return accumulator + current ** 3;
// }, 0);
// console.log("Сумма кубов(reduce):", sumReduce);

// //задание 7
// const goals = [8, 1, 1, 3, 2, -1, 5];
// let maxGoals = -Infinity;
// let maxIndex = 0;

// for (let i = 0; i < goals.length; i++) {
//   if (goals[i] > maxGoals) {
//     maxGoals = goals[i];
//     maxIndex = i;
//   }
// }
// alert(
//   `Самый результативный матч был под номером ${maxIndex + 1}. В нем было забито ${maxGoals} гол(ов)`,
// );

// let minGoals = Infinity;
// const validGoals = goals.filter((goal) => goal >= 0);

// for (let i = 0; i < goals.length; i++) {
//   if (goals[i] >= 0 && goals[i] < maxGoals) {
//     minGoals = goals[i];
//   }
// }

// const minMatches = [];
// for (let i = 0; i < goals.length; i++) {
//   if (goals[i] === minGoals) {
//     minMatches.push(i + 1);
//   }
// }
// alert(
//   `Самые нерезультативные матчи были под номерами ${minMatches.join(", ")}. В каждом из них было забито по ${minGoals} мячу(а).`,
// );

// let totalGoals = 0;
// for (let i = 0; i < goals.length; i++) {
//   if (goals[i] >= 0) totalGoals += goals[i];
// }
// alert(`Общее количество голов за сезон равно ${totalGoals}`);

// const hasAutoDefeat = goals.some((goal) => goal < 0);
// alert(`Были автоматические поражения: ${hasAutoDefeat ? "да" : "нет"}`);

// const average = totalGoals / validGoals.length;
// alert(`Среднее количество голов за матч равно ${average.toFixed(2)}`);

// const sortedGoals = [...goals].sort((a, b) => a - b);
// alert(`Голы в порядке возрастания: ${sortedGoals.join(", ")}`);

//задание 8

const getMathResult = (expression) => {
  if (expression.length < 3) {
    return "Ошибка";
  }
  let filteredExpression = [];

  if (expression.length > 3) {
    for (let i = 0; i < expression.length; i++) {
      const item = expression[i];
      if (!isNaN(Number(item))) {
        filteredExpression.push(String(item));
      } else if ([">", "<", "=", "+", "-", "*", "/"].includes(item)) {
        filteredExpression.push(item);
      }
    }
  } else {
    filteredExpression = [...expression];
  }
  if (filteredExpression.length !== 3) {
    return "Ошибка";
  }
  const first = filteredExpression[0];
  const operator = filteredExpression[1];
  const second = filteredExpression[2];
  const validOperators = [">", "<", "=", "+", "-", "*", "/"];
  if (!validOperators.includes(operator)) {
    return "Ошибка";
  }
  const num1 = Number(first);
  const num2 = Number(second);
  if (isNaN(num1) || isNaN(num2)) {
    return "Ошибка";
  }
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num2 === 0) {
        return "Ошибка"; // или Infinity, но по условию вернём ошибку
      }
      return num1 / num2;
    case ">":
      return num1 > num2;
    case "<":
      return num1 < num2;
    case "=":
      return num1 === num2;
    default:
      return "Ошибка";
  }
};

console.log(
  'getMathResult(["200", "+", 300]):',
  getMathResult(["200", "+", 300]),
);
console.log(
  'getMathResult(["20", "-", "5"]):',
  getMathResult(["20", "-", "5"]),
);
console.log(
  'getMathResult(["100", "/", 100]):',
  getMathResult(["100", "/", 100]),
);
console.log('getMathResult(["2", "-", 2]):', getMathResult(["2", "-", 2]));
console.log(
  'getMathResult(["5", ">", "10"]):',
  getMathResult(["5", ">", "10"]),
);
console.log(
  'getMathResult(["5", "<", "10"]):',
  getMathResult(["5", "<", "10"]),
);
console.log('getMathResult(["1", "=", 1]):', getMathResult(["1", "=", 1]));
console.log('getMathResult(["1", "**", 1]):', getMathResult(["1", "**", 1]));
console.log(
  'getMathResult(["100", "hello", "javascript", "help200", "+", 4]):',
  getMathResult(["100", "hello", "javascript", "help200", "+", 4]),
);
console.log('getMathResult(["100", "+"]):', getMathResult(["100", "+"]));

//задание 9
const matrix = [];

for (let i = 0; i < 3; i++) {
  const row = [];
  for (let j = 1; j <= 5; j++) {
    row.push(j);
  }
  matrix.push(row);
}

console.log(matrix);
