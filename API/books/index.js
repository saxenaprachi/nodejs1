const Router = require("express").Router();
const BookModel = require("../../database/books");


///////////////////////////////////BOOKs DATABASE MANIPULATION/////////////////////////////////////////////////////////////



                       ///////////////////////////GET////////////////////////////////////////////
/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get("/", async(req, res) => {
    return res.json({ books: await BookModel.find() });
  });
 
 
  /*
 Route           /isbn
 Description     get books by id
 Access          PUBLIC
 Parameters      /:isbn
 Method          GET
 */
  Router.get("/isbn/:id", async(req, res)=>{
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
  Router.get("/c/:category", async(req, res)=>{
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
  Router.get("/a/:author", async(req, res)=>{
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
 Router.post("/new", async(req, res)=>{
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
 
 Router.put("/update/:id", async(req, res)=>{
 
   const updatedBook = await BookModel.findOneAndUpdate({id: req.params.id}, 
   {name: req.body.title},
   {new: true}
   );
 
       return res.json({book: updatedBook, message: "Book name updated"});
 });
 /*
 Route           /author/update
 Description     update author
 Access          PUBLIC
 Parameters      :id
 Method          PUT
 */
 
 Router.put("/author/update/:id", async(req, res)=>{
 
   const updatedBook = await BookModel.findOneAndUpdate({id: req.params.id}, 
     {$addToSet: {author: req.body.authorID,}},
     {new: true}
     );
 
   const updatedAuthor= await AuthorModel.findOneAndUpdate({id: req.body.authorID},
     {$addToSet: {book: req.params.id,}},
     {new:true}
     );
     return res.json({books: updatedBook,
       authors: updatedAuthor,
       message: "New author was added ",}
       );
 });
 
 
                        ///////////////////////////DELETE////////////////////////////////////////////
 /*
 Route           /book
 Description     delete book
 Access          PUBLIC
 Parameters      :id
 Method          DELETE
 */
 Router.delete("/:id", async(req, res)=>{
 
   const deletedBook = await BookModel.findOneAndDelete({id: req.params.id});
 
   return res.json({book:deletedBook, message:`book with id ${req.params.id} deleted`});
 });
 
 /*
 Route           /book/author
 Description     delete author from a book
 Access          PUBLIC
 Parameters      :id    // book
 Method          DELETE
 */
 
 Router.delete("/author/:id", async(req, res)=>{
 
   const updatedBook = await BookModel.findOneAndUpdate({id: req.params.id},
     {$pull:{author: req.body.authorID}},
     {new: true});
 
   const updatedAuthor = await AuthorModel.findOneAndUpdate({id:req.body.authorID},
     {$pull:{book: req.params.id}
     },
     {new: true});
 
   return res.json({book: updatedBook, message:`author removed from book with id ${req.params.id}`, 
     author: updatedAuthor, message:`book removed from author with id ${req.body.authorID}`})
 
 });
 
module.exports = Router;