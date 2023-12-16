const express = require("express")
const port = 8081;
const app = express()
app.use(express.json())
app.get('/',(req,res)=>
{
    res.status(200).json({
        message:"Everything is running fine!!"
    })
})
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