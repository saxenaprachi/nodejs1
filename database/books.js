const mongoose = require("mongoose");


//create a book schema
const BookSchema = mongoose.Schema({
    id:String,
        name: String,
        author: [Number],
        language: String,
        pubDate: String,
        numOfPages: Number,
        category: [String],
        publication: [Number]
});

// creating book model

const BookModel = mongoose.model("books", BookSchema);


module.exports = BookModel;
