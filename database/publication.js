const mongoose = require("mongoose");


//create a book schema
const PublicationSchema = mongoose.Schema({
    id:String,
        name: String,
        book: [String],
});

// creating book model

const PublicationModel = mongoose.model("publications", PublicationSchema);


module.exports = PublicationModel;
