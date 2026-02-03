//задание 1 объявление функции, присвоение переменной, стрелочная
function getName1(name) {
  return `Имя равно ${name}`;
}

const getName2 = function (name) {
  return `Имя равно ${name}`;
};

const getName3 = (name) => {
  return `Имя равно ${name}`;
};

console.log(getName1("Надежда"));
console.log(getName2("Катерина"));
console.log(getName3("Наталья"));

//задание 2
const getSumNumbers = (number, type = "odd") => {
  let sum = 0;
  for (let i = 0; i <= number; i++) {
    if (type === "odd" && i % 2 !== 0) {
      sum += i;
    } else if (type === "even" && i % 2 === 0) {
      sum += i;
    } else if (type === "") {
      sum += i;
    }
  }
  return sum;
};

console.log(getSumNumbers(10, "odd"));
console.log(getSumNumbers(10, "even"));
console.log(getSumNumbers(10, ""));

//задание 3
const getDivisorsCount = (number = 1) => {
  if (number < 0 || !Number.isInteger(number)) {
    alert("number должен быть целым числом и больше нуля");
    return;
  }
  let count = 0;
  for (let i = 1; i <= number; i++) {
    if (number % i === 0) {
      count++;
    }
  }
  return count;
};

console.log(getDivisorsCount(-1));
console.log(getDivisorsCount(5));
console.log(getDivisorsCount(12));

//задание 4
const checkQuestionAnswer = (question, correctAnswer) => {
  const userAnswer = prompt(question);
  if (userAnswer === null) return;
  const normalizeUserAnswer = userAnswer.trim().toLowerCase();
  const normalizeAnswer = correctAnswer.trim().toLowerCase();
  if (normalizeUserAnswer === normalizeAnswer) {
    alert("ответ верный");
  } else {
    alert("ответ неверный");
  }
};

checkQuestionAnswer("арбуз это фрукт или ягода?", "ягода");
checkQuestionAnswer("сколько в среднем зубов у взрослого человека?", "32");
checkQuestionAnswer("как называется самая маленькая птица в мире?", "колибри");

//задание 5
function showSuccessMessage(massage) {
  console.log(massage);
}

function showErrorMessage(massage) {
  console.error(massage);
}

function checkTextOnErrorSymbol(
  text,
  errorSymbol,
  successCallback,
  errorCallback,
) {
  let found = false;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === errorSymbol) {
      errorCallback(
        `Найден запрещенный символ ${errorSymbol} под индексом ${i}`,
      );
      found = true;
    }
  }
  if (!found) {
    successCallback("В данном тексте нет запрещенных символов");
  }
}

const text = "Привет! Как дела! Давно мы с тобой не виделись.";
checkTextOnErrorSymbol(text, "о", showSuccessMessage, showErrorMessage);
