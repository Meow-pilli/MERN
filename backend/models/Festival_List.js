const mongoose = require('mongoose')

const FestivalSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true,
    },

    Name: {
        type: String,
    },

    Type: {
        type: String,
    },

    Country_Name: {
        type: String,
    },

    Country_Code: {
        type: String,
    },

});

const FestivalModel = mongoose.model("Festival_List", FestivalSchema)
module.exports = FestivalModel