const mongoose = require("mongoose");

const activeFestivalSchema = new mongoose.Schema({
  Ufestival: {
    type: String,
    required: true,
  },
  Ubudget: {
    type: Number,
    required: true,
  }
});

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
  activeFestival: {
    type: [activeFestivalSchema],
    required: true,
  }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;