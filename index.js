require("dotenv").config();

//Framework
const express = require("express");

//database
const database = require("./database/index");
const mongoose= require("mongoose");

//models

const BookModel = require("./database/books");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

//connect to data base
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>console.log("DB connection established!!"));

//intiallizing express
 const BookTab = express();

//configurations
 BookTab.use(express.json());



///////////////////////////////////BOOKs DATABASE MANIPULATION/////////////////////////////////////////////////////////////



                       ///////////////////////////GET////////////////////////////////////////////
/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
BookTab.get("/", async(req, res) => {
   return res.json({ books: await BookModel.find() });
 });


 /*
Route           /isbn
Description     get books by id
Access          PUBLIC
Parameters      /:isbn
Method          GET
*/
 BookTab.get("/isbn/:id", async(req, res)=>{
    const getSpecificBook = await BookModel.findOne({id: req.params.id});
    if(!getSpecificBook){
        return res.json({error : "NO book for following data"});
    };
    return res.json({book: getSpecificBook});
   });

 /*
Route           /c
Description     get books by category
Access          PUBLIC
Parameters      /:category
Method          GET
*/
 BookTab.get("/c/:category", async(req, res)=>{
  const getSpecificBook = await BookModel.find({category: req.params.category});
  if(!getSpecificBook){
      return res.json({error : "NO book for following data"});
  };
  return res.json({book: getSpecificBook});
   });
 /*
Route           /a
Description     get books by author id
Access          PUBLIC
Parameters      /:author
Method          GET
*/
 BookTab.get("/a/:author", async(req, res)=>{
  const getSpecificBook = await BookModel.find({author: req.params.author});
  if(!getSpecificBook){
      return res.json({error : "NO book for following data"});
  };
  return res.json({book: getSpecificBook});
   });
   
                          ///////////////////////////POST////////////////////////////////////////////
 /*
Route           /book/new
Description     add new book
Access          PUBLIC
Parameters      none
Method          Post
*/
BookTab.post("/book/new", async(req, res)=>{
  //req-body
 const {newBook}=  req.body;
 const addNewBook= await BookModel.create(newBook);
 return res.json({book:addNewBook, message: "book was added"});

});

                       ///////////////////////////PUT////////////////////////////////////////////

/*
Route           /book/update
Description     update title
Access          PUBLIC
Parameters      :id
Method          PUT
*/

BookTab.put("/book/update/:id", (req, res)=>{
  database.books.forEach((book)=>{
    if(book.id== req.params.id){
      book.name = req.body.bookTitle;
      return res.json({book:database.books, message: "Book name updated"});
    }
    return;
  })

});
/*
Route           /book/author/update
Description     update author
Access          PUBLIC
Parameters      :id
Method          PUT
*/

BookTab.put("/book/author/update/:id", (req, res)=>{
  database.books.forEach((book)=>{
    if(book.id== req.params.id){
     return book.author.push(req.body.authorID);
    }
  })
  database.authors.forEach((author)=>{
    if(author.id===req.body.authorID){
      return author.book.push(req.params.id);
    }
    return res.json({books: database.books,
      authors: database.authors,
      message: "New author was added ",});
  })
});


                       ///////////////////////////DELETE////////////////////////////////////////////
/*
Route           /book
Description     delete book
Access          PUBLIC
Parameters      :id
Method          DELETE
*/
BookTab.delete("/book/:id", (req, res)=>{
  const newBooks = database.books.filter((book)=> book.id!==req.params.id);
  database.books = newBooks;
  return res.json({book:database.books, message:`book with id ${req.params.id} deleted`});
});

/*
Route           /book/author
Description     delete author from a book
Access          PUBLIC
Parameters      :id    // book
Method          DELETE
*/

BookTab.delete("/book/author/:id", (req, res)=>{
  database.books.forEach((book)=> {
    //update book database
  if(book.id===req.params.id)
  {
    book.author = book.author.filter((author)=>author!== req.body.authorID);
    
  }
  });

    //update author database
  database.authors.forEach((author)=>{
    if(author.id === req.body.authorID){
      author.book = author.book.filter((book)=> book!==req.params.id);
    }
  });
  return res.json({book: database.books, message:`author removed from book with id ${req.params.id}`, 
    author: database.authors, message:`book removed from author with id ${req.body.authorID}`})

});



///////////////////////////////////AUTHORS DATABASE MANIPULATION/////////////////////////////////////////////////////////////



                       ///////////////////////////GET////////////////////////////////////////////
/*
Route           /author
Description     get all authors
access          PUBLIC
Parameters      NONE
Method          GET  
*/

BookTab.get("/author", async(req, res)=>{
  return res.json({author: await AuthorModel.find()});
});
/*
Route           /author
Description     get author by id
access          PUBLIC
Parameters      :authorid
Method          GET  
*/
BookTab.get("/author/:id", async(req, res)=>{
  const getSpecificBook = await AuthorModel.findOne({id: req.params.id});
  if(!getSpecificBook){
      return res.json({error : "NO book for following data"});
  };
  return res.json({book: getSpecificBook});
});

/*
Route           /author/book
Description     get list of author by bookid
access          PUBLIC
Parameters      :book
Method          GET  
*/

BookTab.get("/author/book/:book", async(req, res)=>{
  const getSpecificBook = await AuthorModel.find({book: req.params.book});
  if(!getSpecificBook){
      return res.json({error : "NO book for following data"});
  };
  return res.json({book: getSpecificBook});
});


                       ///////////////////////////POST////////////////////////////////////////////
/*
Route           /authors/new
Description     add new author
Access          PUBLIC
Parameters      none
Method          Post
*/
BookTab.post("/authors/new", async (req, res)=>{
  //req-body
 const {newAuthor}=  req.body;
 const addNewAuthor = await AuthorModel.create(newAuthor);
 return res.json({author:newAuthor, message: "author was added"});

});

                       ///////////////////////////PUT////////////////////////////////////////////
/*
Route           /author/update
Description     Update Author Name
Access          PUBLIC
Parameters      id
Method          PUT
*/
BookTab.put("/author/update/:id", (req,res)=>{
  database.authors.forEach((author)=>{
    if(author.id===req.params.id){
      author.name = req.body.authorName;
      return res.json({author: database.authors, message:"Author name updated"});
    }
  })
});

                       ///////////////////////////DELETE////////////////////////////////////////////
/*
Route           /author/delete
Description     delete author
Access          PUBLIC
Parameters      id
Method          DELETE
*/
BookTab.delete("/author/delete/:id", (req, res)=>{
  database.authors= database.authors.filter((author)=>author.id!==req.params.id);
  return res.json({author:database.authors, message:"Author deleted"});
});




///////////////////////////////////PUBLICATIONS DATABASE MANIPULATION/////////////////////////////////////////////////////////////



                       ///////////////////////////GET////////////////////////////////////////////

/*
Route           /publications
Description     get all publications
access          PUBLIC
Parameters      NONE
Method          GET  
*/
BookTab.get("/publications", async(req, res)=>{
  return res.json({publication: await PublicationModel.find()});
});

/*
Route           /publications
Description     get publication by id
access          PUBLIC
Parameters      /:id
Method          GET  
*/

BookTab.get("/publications/:id", async(req, res)=>{
  const getSpecificPublication = await PublicationModel.findOne({id: req.params.id});

  if(!getSpecificPublication){
    return res.json({error: `No publication with the id ${id} found`});
  }

  return res.json({publication: getSpecificPublication});
}); 

/*
Route           /publications/books
Description     get publication by bookid
access          PUBLIC
Parameters      /:book
Method          GET  
*/
BookTab.get("/publications/books/:book", async(req, res)=>{
  const getSpecificPublications = await PublicationModel.find({book: req.params.book});
  if(!getSpecificPublications){
    return res.json({error: `No publiication with a book ${book} found`});
  }
  return res.json({publication: getSpecificPublications});

});
                       ///////////////////////////POST////////////////////////////////////////////
/*
Route           /publications/new
Description     add new publication 
access          PUBLIC
Parameters      NONE
Method          POST
*/
BookTab.post("/publications/new", async(req, res)=>{
  const newPublication = req.body.newPublication;
  const addNewPublication= await PublicationModel.create(newPublication);
  return res.json({publication: addNewPublication});
});

                       ///////////////////////////PUT////////////////////////////////////////////
/*
Route           /publications/update/book
Description     update publication databse
access          PUBLIC
Parameters      /:id
Method          PUT 
*/
BookTab.put("/publications/update/book/:id", (req, res)=>{
//update publicatons data

database.publications.forEach((publication)=>{
   if(publication.id === req.body.pubID){
     return publication.book.push(req.params.id);
   };
});

//update book data

database.books.forEach((book)=>{
  if(book.id=== req.params.id){
    return book.publication.push(req.body.pubID);
  }
});

return res.json({books: database.books,
  publications: database.publications,
  message: "New book was added in publication",});

});

                       ///////////////////////////DELETE////////////////////////////////////////////



 BookTab.listen(3000, ()=> console.log("Server Running!!"));