const Router = require("express").Router();
const AuthorModel = require("../../database/author");

///////////////////////////////////AUTHORS DATABASE MANIPULATION/////////////////////////////////////////////////////////////



                       ///////////////////////////GET////////////////////////////////////////////
/*
Route           /author
Description     get all authors
access          PUBLIC
Parameters      NONE
Method          GET  
*/

Router.get("/", async(req, res)=>{
    return res.json({author: await AuthorModel.find()});
  });
  /*
  Route           /author
  Description     get author by id
  access          PUBLIC
  Parameters      :authorid
  Method          GET  
  */
  Router.get("/:id", async(req, res)=>{
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
  
  Router.get("/book/:book", async(req, res)=>{
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
  Router.post("/authors/new", async (req, res)=>{
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
  Router.put("/update/:id", async(req,res)=>{
  
    const updatedAuthor = await AuthorModel.findOneAndUpdate({id: req.params.id},
      {name: req.body.authorName},
      {new: true});
        return res.json({author: updatedAuthor, message:"Author name updated"});
  });
  
                         ///////////////////////////DELETE////////////////////////////////////////////
  /*
  Route           /author/delete
  Description     delete author
  Access          PUBLIC
  Parameters      id
  Method          DELETE
  */
  Router.delete("/delete/:id", async(req, res)=>{
    const deletedAuthor = await AuthorModel.findOneAndDelete({id: req.params.id});
    return res.json({author: deletedAuthor, message:"Author deleted"});
  });
  

  //export

  module.exports = Router;
  