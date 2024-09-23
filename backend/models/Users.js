const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  activeFestival: [
    {
      Ufestival: {   //user saved festivals
        type: String,
        required: true,
      },
      Ubudget: {  //user saved budget
        type: Number,
        required: true,
      },
    },
  ],
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;