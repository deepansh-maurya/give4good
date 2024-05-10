let array = [
  {
    name: "ddep",
    age: [
      {
        one: "3455343534",
        two: "34543",
        three: "345345",
      },
    ],
  },
  {
    name: "dfgdfgd",
    age: [
      {
        one: "456546",
        two: "456",
        three: "456",
      },
    ],
  },
];

let obj1 = array.filter((data) => data.name == "ddep");
obj1[0].age[0].one = "00080";
console.log(array[0]);
