const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://momoelo1:${password}@cluster0.yaowcxp.mongodb.net/personApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);



const name = process.argv[3];
const number = process.argv[4];


const person = new Person({
  name: name,
  number: number,
});


/*
person.save().then((result) => {
  console.log("person saved!");
});
*/

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});
