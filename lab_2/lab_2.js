// //задание 1
// const existedUserLogin = "the_best_user";
// const existedUserPassword = "12345678";

// const userLogin = prompt("Введите логин").trim();
// const userPassword = prompt("Введите пароль").trim();

// if (existedUserLogin === userLogin && existedUserPassword === userPassword) {
//   alert(`Добро пожаловать, ${existedUserLogin}`);
// } else {
//   alert(`Логин и(или) Пароль введены неверно`);
// }

// //задание 2
// const answer = [4, 4, 1, 12, 6];

// const task = [
//   "Сколько будет 2 + 2?",
//   "Сколько будет 2 * 2?",
//   "У пети было 5 блок. 3 из них он съел, 1 отдал другу. Сколько яблок у Пети осталось?",
//   "У Маши было 10 конфет. 2 она съела, 1 отдала другу. После мама дала Маше еще 5 конфет. сколько в итоге конфет осталось у Маши?",
//   "Сколько будет 2 + 2 * 2?",
// ];

// let correctAnswers = 0;
// let incorrectAnswers = 0;

// for (let i = 0; i < task.length; i++) {
//   let userAnswer = Number(prompt(task[i]));

//   if (userAnswer === answer[i]) {
//     alert("Ответ Верный");
//     correctAnswers += 1;
//   } else {
//     alert("Ответ Неверный");
//     incorrectAnswers += 1;
//   }
// }

// alert(
//   `Конец теста! Правильные ответы - ${correctAnswers}; Неправильные ответы - ${incorrectAnswers}`,
// );

// //задание 3
// let answer1 = confirm("JavaScript появился в 1995 году?");

// if (answer1 === true) {
//   alert("Верно");
// } else {
//   alert("Неверно. JavaScript появился в 1995 году");
// }

// let answer2 = confirm("Спецификация JavaScript называется ECMAScript?");

// if (answer2 === true) {
//   alert("Верно");
// } else {
//   alert("Неверно. Спецификация JavaScript называется ECMAScript");
// }

// let answer3 = confirm("JavaScript был создан за 1 месяц?");

// if (answer3 === true) {
//   alert("Неверно");
// } else {
//   alert("Верно. JavaScript был создан за 10 дней");
// }

// // задание 4
// let i = 0

// while (i < 3){
//     let newStudent = prompt("Введите имя нового студента").trim()
//     if (newStudent){
//         alert(`Добро пожаловать, ${newStudent}!`)
//     }
//     i += 1
// }

// do {
//     let newStudent = prompt("Введите имя нового студента").trim()
//     if (newStudent){
//         alert(`Добро пожаловать, ${newStudent}!`)
//     }
//     i += 1
// } while (i < 3)

// // задание 5
// let sum = 0;
// for (let number = 0; number <= 100; number++) {
//   sum = sum + number;
// }
// alert(`Сумма чисел от 0 до 100 составляет: ${sum}`);

// // задание 6
// const clientName = "Игорь";
// let clientSpentForAllTime = 110;
// let clientSpentToday = 25;
// let discount = 0;

// if (clientSpentForAllTime >= 100 && clientSpentForAllTime < 300) {
//   discount = 10;
// } else if (clientSpentForAllTime >= 300 && clientSpentForAllTime < 500) {
//   discount = 20;
// } else if (clientSpentForAllTime >= 500) {
//   discount = 30;
// }

// alert(`Вам предоставляется скидка в ${discount}%`);

// clientSpentToday = clientSpentToday * (1 - discount / 100);

// clientSpentForAllTime += clientSpentToday;

// alert(
//   `Спасибо, ${clientName}! К оплате  ${clientSpentToday}$. За все время в нашем ресторане вы потратили ${clientSpentForAllTime}$`
// );

// // задание 7
// let clientName = prompt("Введите имя клиента")
// let clientSpentToday = Number(prompt("Сколько клиент потратил сегодня"))
// let clientSpentForAllTime = Number(prompt("Сколько клиент потратил за все время"))

// if (isNaN(clientSpentToday) || isNaN(clientSpentForAllTime)){
//     alert("Сумма, которую клиент потратил за все время и которую потратил сегодня, должна быть числом! Перезагрузите страницу, чтобы повторить попытку")
// } else {
//     let discount = 0
//     if (clientSpentForAllTime >= 100 && clientSpentForAllTime < 300){
//         discount = 10
//     } else if (clientSpentForAllTime >=300 && clientSpentForAllTime <500){
//         discount = 20
//     } else if (clientSpentForAllTime >= 500) {
//         discount = 30
//     }
//     alert(`Вам предоставляется скидка в ${discount}%`)
//     clientSpentToday = clientSpentToday * (1 - discount / 100)
//     clientSpentForAllTime += clientSpentToday
//     alert(`Спасибо, ${clientName}! К оплате  ${clientSpentToday}$. За все время в нашем ресторане вы потратили ${clientSpentForAllTime}$`)
// }

// //задание 8
// let password = prompt("ВВедите пароль");

// if (password.length < 3 || password.length > 20) {
//   alert(
//     "Длина пароля должна быть минимум 3 символа и не больше 20 символов(включая 20)",
//   );
// } else {
//   let hasUpperCase = false;
//   let hasDigit = false;

//   for (let i = 0; i < password.length; i++) {
//     let symbol = password[i];

//     if (symbol >= "0" && symbol <= "9") {
//       hasDigit = true;
//     }
//     if (symbol >= "A" && symbol <= "Z") {
//       hasUpperCase = true;
//     }
//   }
//   if (hasUpperCase && hasDigit) {
//     alert("Пароль валидный. Добро пожаловать в аккаунт!");
//   } else {
//     alert(
//       "Пароль не удовлетворяет условиям! Перезагрузите страницу и попробуйте ввести его еще раз",
//     );
//   }
// }
