// //задание 1
// const addzero = (numberStr) =>
//   String(numberStr).length === 1 ? `0${numberStr}` : String(numberStr);

// const getDateformat = (date, separator = ".") => {
//   const dateItem = date.getDate();
//   const month = date.getMonth();
//   const year = date.getFullYear();
//   const dateArray = [dateItem, month + 1, year].map((item) => addzero(item));
//   console.log("dateArray", dateArray);
//   return dateArray.join(separator);
// };
// console.log(getDateformat(new Date()));

// //задание 2
// function convertMsToDays(ms) {
//   return Math.round(ms / 1000 / 60 / 60 / 24);
// }

// function getDaysBeforeBirthday(nextBirthdayDate) {
//   const today = new Date();
//   const diffMs = nextBirthdayDate - today;
//   const daysLeft = convertMsToDays(diffMs);
//   return daysLeft;
// }

// const myBirthday = new Date(2026, 9, 14);
// console.log(
//   "до дня рождения осталось дней:",
//   getDaysBeforeBirthday(myBirthday),
// );

// //задание 3
// function addDays(date, days = 1) {
//   const originalTimestamp = date.getTime();
//   const daysInmilliseconds = days * 24 * 60 * 60 * 1000;
//   const newTimestamp = originalTimestamp + daysInmilliseconds;
//   const newDate = new Date(newTimestamp);
//   return newDate;
// }

// const testDate = new Date(2026, 2, 16);
// console.log("Исходная дата:", testDate);

// const result = addDays(testDate, 5000);
// console.log("+5000 дней:", result);

//задание 4
const peopleWithVisa = [
  {
    firstName: "Stasia",
    lastName: "Ward",
    criminalRecord: true,
    passportExpiration: "19.06.2023",
  },
  {
    firstName: "Elliot",
    lastName: "Baker",
    criminalRecord: false,
    passportExpiration: "04.06.2021",
  },
  {
    firstName: "Leighann",
    lastName: "Scott",
    criminalRecord: true,
    passportExpiration: "31.07.2022",
  },
  {
    firstName: "Nick",
    lastName: "Pop",
    criminalRecord: false,
    passportExpiration: "31.12.2021",
  },
];

function allowVisa(people) {
  const today = new Date();
  const allowedPeople = people.filter((person) => {
    if (person.criminalRecord) {
      return false;
    }

    const dateParst = person.passportExpiration.split(".");

    const day = dateParst[0];
    const month = dateParst[1];
    const year = dateParst[2];

    const expirationDate = new Date(year, month - 1, day);

    if (expirationDate > today) {
      return true;
    } else {
      return false;
    }
  });
  return allowedPeople;
}
const result = allowVisa(peopleWithVisa);
console.log("result", result);
