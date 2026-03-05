// // задание 1
// const users = [
//   {
//     username: "David",
//     status: "online",
//     lastActiviti: 10,
//   },
//   {
//     username: "Lucy",
//     status: "offline",
//     lastActivity: 22,
//   },
//   {
//     username: "Bob",
//     status: "online",
//     lastActivity: 104,
//   },
// ];

// const onlineUsers = users.filter((user) => user.status === "online");
// const userOnlineName = onlineUsers.map((user) => user.username).join(", ");

// alert(`Сейчас в онлайн следующие пользователи: ${userOnlineName}`);

// //задание 2
// function giveTalonsInOrder(patiens, order) {
//   const patiensMap = {};
//   for (let patient of patiens) {
//     patiensMap[patient.id] = patient;
//   }

//   const orderedPatients = [];
//   for (let id of order) {
//     if (patiensMap[id]) {
//       orderedPatients.push(patiensMap[id]);
//     }
//   }
//   return orderedPatients;
// }

// const orderArr = [4, 2, 1, 3];
// const people = [
//   { id: 1, name: "Максим" },
//   { id: 2, name: "Николай" },
//   { id: 3, name: "Ангелина" },
//   { id: 4, name: "Виталий" },
// ];
// const result = giveTalonsInOrder(people, orderArr);
// console.log("result", result);

// //задание 3
// function handleObject(obj, key, action) {
//   const newObj = { ...obj };

//   switch (action) {
//     case "get":
//       return newObj[key];
//     case "add":
//       newObj[key] = "";
//       return newObj;
//     case "delete":
//       delete newObj[key];
//       return newObj;
//     default:
//       return newObj;
//   }
// }

// const student = {
//   name: "Maxim",
//   programmingLanguage: "JavaScript",
// };
// const result = handleObject(student, "programmingLanguage", "delete");
// console.log("result", result);

// //задание 4
// function giveJobStudent(student, jobName) {
//   const updatedStudent = {
//     ...student,
//     job: jobName,
//   };
//   alert(
//     `Поздравляем! У студента ${updatedStudent.fullName} появилась новая работа! Теперь он ${jobName}`,
//   );

//   return updatedStudent;
// }

// const student = {
//   fullName: "Maxim",
//   experienceInmonths: 12,
//   stack: ["HTML", "CSS", "JavaScript", "React"],
// };
// const updatedStudent = giveJobStudent(student, "веб-разработчик");

// //задание 5
// const groceries = {
//   "Orange Juice": {
//     price: 1.5,
//     discount: 10,
//   },
//   Chocolate: {
//     price: 2,
//     discount: 0,
//   },
// };
// function getTotalpriceOfShoppingBag(shoppingBag) {
//   let totalPrice = 0;

//   for (let item of shoppingBag) {
//     const productInfo = groceries[item.product];

//     if (productInfo) {
//       const priceWithDiscount =
//         productInfo.price * (1 - productInfo.discount / 100);

//       totalPrice += priceWithDiscount * item.quantity;
//     }
//   }
//   return Number(totalPrice.toFixed(2));
// }

// const shoppingBag = [
//   { product: "Chocolate", quantity: 3 },
//   { product: "Orange Juice", quantity: 23 },
// ];
// const totalPrice = getTotalpriceOfShoppingBag(shoppingBag);
// console.log("totalPrice", totalPrice);

// задание 7
function getKiller(suspectInfo, deadPeople) {
  for (let suspect in suspectInfo) {
    const peopleSeen = suspectInfo[suspect];
    const sawAllDead = deadPeople.every((deadPerson) =>
      peopleSeen.includes(deadPerson),
    );
    if (sawAllDead) {
      return suspect;
    }
  }
  return null;
}

const result = getKiller(
  {
    james: ["Jacob", "Bill", "Lucas"],
    johnny: ["David", "Kyle", "Lucas"],
    Peter: ["Lucy", "Kyle"],
  },
  ["Lucas", "Bill"],
);
console.log("Убийца", result);
