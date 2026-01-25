// //задание 1
const myName = "Екатерина";
const programmingLanguage = "JavaScript";
const courseCreatorName = "Никиты Михайловича";
const reasonText = "хочу изучить дополнительную информацию";
const numberOfMonth = 5;

const resultText = `Всем привет! Меня зовут, ${myName}. Сейчас я изучаю язык программирования ${programmingLanguage} на курсе по ${programmingLanguage} у ${courseCreatorName}. Я хочу стать веб-разработчиком, потому что ${reasonText}. До этого я изучала ${programmingLanguage} ${numberOfMonth} месяцев. Я уверена, что пройду данный курс до конца!`;

console.log(resultText);

// //задание 2
let myInfoText = `Всем привет! Меня зовут, ${myName}. Сейчас я изучаю язык программирования ${programmingLanguage} на курсе по ${programmingLanguage} у ${courseCreatorName}. Я хочу стать веб-разработчиком, потому что ${reasonText}. До этого я изучала ${programmingLanguage} ${numberOfMonth} месяцев. Я уверена, что пройду данный курс до конца!`;

myInfoText = myInfoText.replaceAll("JavaScript", "JAVASCRIPT");

console.log(myInfoText);
console.log("Длина строки:", myInfoText.length);
console.log("Первый символ:", myInfoText[0]);
console.log("Последний символ:", myInfoText[myInfoText.length - 1]);

// //задание 3
const userName = prompt("Как вас зовут?");
const userNameFormatted = userName.toLowerCase().trim();

alert(`Вас зовут ${userNameFormatted}`);

// //задание 4
const userAge = prompt("Сколько вам лет?");
const userAgeFormatted = Number(userAge.trim());
alert(`Вас зовут ${userNameFormatted} и вам ${userAgeFormatted} лет`);

// //задание 5
const userString = prompt("Введите текст для обрезки:").trim();
const startSliceIndex = Number(
  prompt("Введите индекс, с которого нужно нужно начать обрезку строки:"),
);
const endSliceIndex = Number(
  prompt("Введите индекс, которым нужно закончить обрезку строки:"),
);
const result = userString.slice(startSliceIndex, endSliceIndex);
alert(`Результат: ${result}`);

// //задание 6
const userText = prompt("Введите текст").trim();
const wordFromText = prompt("Введите слово из текста").trim();

const indexOfWord = userText.indexOf(wordFromText);
const userTextResult = userText.slice(0, indexOfWord);

alert(`Результат: ${userTextResult}`);

//задание 7
const javaScriptDescription =
  "JavaScript - мультимедийный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализаций спецификации ECMAScript. JavaScript обычно используется как встраеваемый язык для программного доступа к объектам приложенийю.";

const halfLength = Math.floor(javaScriptDescription.length / 2);
let resultLenght = javaScriptDescription.slice(0, halfLength);

resultLenght = resultLenght.replaceAll("а", "А");

resultLenght = resultLenght.replaceAll(" ", "");

resultLenght = resultLenght.repeat(3);

const middleIndex = Math.floor(resultLenght.length / 2);
const middleChar = resultLenght[middleIndex];

console.log(`Символ посередине: ${middleChar}`);
console.log(`Итоговая строка: ${resultLenght}`);
