const books =[
    {
        id: "122E45",
        name: "MERN",
        author: ["1", "2"],
        language:"en",
        pubDate: "2001-6-5",
        numOfPages: 255,
        category: ["Tech", "Computer"],
        publication: ["1","2"]
},
    {
        id: "122E46",
        name: "MERNED",
        author: ["1"],
        language:"en",
        pubDate: "2001-9-5",
        numOfPages: 265,
        category: [ "Computer"],
        publication: ["1"]
},
];
const authors =[
    {
        id: "1",
        name: "Pavan",
        book: ["122E45", "122E46"],
},
    {
        id: "2",
        name: "Sharuya",
        book: ["122E45"],
},
];
const publications =[
    {
        id: "1",
        name: "Chakra",
        book : ["122E45", "122E46"],
},
    {
        id: "2",
        name: "SHAPEAI",
        book : ["122E45"],
},
];
module.exports = { books, authors, publications };