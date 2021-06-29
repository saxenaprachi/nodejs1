//Framework
const express = require("express");

//database
const database = require("./database/index");


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
BookTab.get("/", (req, res) => {
   return res.json({ books: database.books });
 });


 /*
Route           /isbn
Description     get books by id
Access          PUBLIC
Parameters      /:isbn
Method          GET
*/
 BookTab.get("/isbn/:isbn", (req, res)=>{
    const getSpecificBook = database.books.filter((book)=>  book.id === req.params.isbn);

    if(getSpecificBook==0){
        return res.json({error : "Error"});
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
 BookTab.get("/c/:category", (req, res)=>{
    const getSpecificBook = database.books.filter((book)=>  book.category.includes(req.params.category) );

    if(getSpecificBook==0){
        return res.json({error : "Error"});
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
 BookTab.get("/a/:author", (req, res)=>{
    const getSpecificBook = database.books.filter((book)=>  book.author.includes(req.params.author) );

    if(getSpecificBook==0){
        return res.json({error : "Error"});
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
BookTab.post("/book/new", (req, res)=>{
  //req-body
 const {newBook}=  req.body;
 database.books.push(newBook);
 return res.json({book:database.books, message: "book was added"});

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

BookTab.get("/author", (req, res)=>{
  return res.json({author: database.authors});
});
/*
Route           /author
Description     get author by id
access          PUBLIC
Parameters      :authorid
Method          GET  
*/
BookTab.get("/author/:id", (req, res)=>{
  const getSpecificAuthor = database.authors.filter((author)=> author.id === req.params.id);

  if(getSpecificAuthor.length ==0){
    return res.json({error:`no Author with Id ${req.params.id} found`});
  }

  return res.json({author: getSpecificAuthor});
});

/*
Route           /author/book
Description     get list of author by bookid
access          PUBLIC
Parameters      :book
Method          GET  
*/

BookTab.get("/author/book/:book", (req, res)=>{
  const getSpecificAuthors = database.authors.filter((author)=> author.book.includes(req.params.book));

  if(getSpecificAuthors.length==0){
    return res.json({error : `no author for book ${book} ID found`});
  }

  return res.json({author: getSpecificAuthors});
});


                       ///////////////////////////POST////////////////////////////////////////////
/*
Route           /authors/new
Description     add new author
Access          PUBLIC
Parameters      none
Method          Post
*/
BookTab.post("/authors/new", (req, res)=>{
  //req-body
 const {newAuthor}=  req.body;
 database.authors.push(newAuthor);
 return res.json({book:database.authors, message: "author was added"});

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


/*
Route           /publications
Description     get all publications
access          PUBLIC
Parameters      NONE
Method          GET  
*/
BookTab.get("/publications", (req, res)=>{
  return res.json({publication: database.publications});
});

/*
Route           /publications
Description     get publication by id
access          PUBLIC
Parameters      /:id
Method          GET  
*/

BookTab.get("/publications/:id", (req, res)=>{
  const getSpecificPublication = database.publications.filter((publication)=> publication.id === req.params.id);

  if(getSpecificPublication.length== 0){
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
BookTab.get("/publications/books/:book", (req, res)=>{
  const getSpecificPublications = database.publications.filter((publication)=> publication.book.includes(req.params.book));
  if(getSpecificPublications.length ==0){
    return res.json({error: `No publiication with a book ${book} found`});
  }
  return res.json({publication: getSpecificPublications});
});
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

 BookTab.listen(3000, ()=> console.log("Server Running!!"));