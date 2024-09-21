const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema({
  symbol: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  symbol_native: {
    type: String,
  },
  decimal_digits: {
    type: Number,
  },
  rounding: {
    type: Number,
  },
  code: {
    type: String,
  },
  name_plural: {
    type: String,
  },
});

const CurrencyModel = mongoose.model("Currency", CurrencySchema);
module.exports = CurrencyModel;