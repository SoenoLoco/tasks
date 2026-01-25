let Name = prompt("введите имя");
let Age = prompt("введите возраст");

if (Age < 18) {
  console.log(`привет ${Name}! Ты еще школьник`);
} else if (Age >= 18 && Age <= 65) {
  console.log(`Привет ${Name}! Ты взрослый человек заходи`);
} else {
  console.log(`Привет ${Name}! Для возрастных лиц у нас скидки`);
}
