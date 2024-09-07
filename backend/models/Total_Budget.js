const mongoose = require('mongoose')

const BudgetSchema = new mongoose.Schema({
    Budget: {
        type: Number,
        required: true,
    },

    Travel: {
        type: Number,
        required: true,
    },

    Meals: {
        type: Number,
        required: true,
    },

    Decorations: {
        type: Number,
    },

    Gifts: {
        type: Number,
    },

    Entertainment: {
        type: Number,
    },

    Misc: {
        type: Number,
    },
});

const BudgetModel = mongoose.model("Total Budget", BudgetSchema)
model.exports = BudgetModel