const express = require("express")  //Importing Express

const port = 8081; // Declaring Port at which server will run  

const app = express(); // Declaring express as app

app.use(express.json()) // It will use json format data

const userRouter = require("./Routes/users.js"); // importing users.js
const bookRouter = require("./Routes/books.js"); // importing books.js

const {users} = require("./data/users.json"); // importing Users data
const {books} = require("./data/books.json"); // Importing books data

// Test method,home page
app.get('/',(req,res)=>
{
    res.status(200).json({
        message:"Everything is running fine!!"
    })
})

app.use('/users',userRouter);
app.use('/books',bookRouter);

/**It is for all methods  */
app.all('*',(req,res)=>
{
    res.status(500).json({
        message:"Not implemented"
    })
})
app.listen(port,(req,res)=>
{
    console.log(`Server is running at port ${port}`);
})