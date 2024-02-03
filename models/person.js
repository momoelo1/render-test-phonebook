const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to ", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connecting to mongoDB");
  })
  .catch((error) => {
    console.log("error connecting to monogDB", error.message);
  });

const phoneValidation = (validation) =>
  /^(\d{2}-\d{8}|\d{3}-\d{8})/.test(validation);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: Number,
    validate: {
      validator: phoneValidation,
    },
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
