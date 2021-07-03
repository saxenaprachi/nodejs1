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

//micro secrvices routes
const books = require("./API/books");
const authors = require("./API/authors");
const publications = require("./API/publications");

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

 //intializing Microservices

 BookTab.use("/books", books);
 BookTab.use("/authors", authors);
 BookTab.use("/publications", publications);
 BookTab.listen(3000, ()=> console.log("Server Running!!"));