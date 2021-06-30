const mongoose = require("mongoose");


//create a book schema
const AuthorSchema = mongoose.Schema({
    id:String,
        name: String,
        book: [String],
});

// creating book model

const AuthorModel = mongoose.model(AuthorSchema);


module.exports = AuthorModel;
