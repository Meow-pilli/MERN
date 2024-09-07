const mongoose = require('mongoose')

const BudgetSchema = new mongoose.Schema({
    Budget: {
        type: Number,

    },

    Travel: {
        type: Number,

    },

    Meals: {
        type: Number,
        
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

const BudgetModel = mongoose.model("Total_Budget", BudgetSchema)
module.exports = BudgetModel