const express = require("express");
const { books } = require("../data/books.json"); // Importing books data
const { users } = require("../data/users.json"); // importing Users data
const router = express.Router();

/**
 * Route:/books
 * Method:GET
 * Description:Getting the list of all books
 * Access:Public
 * Parameters:None
 */
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    })
})
/**
 * Route:/users/:{id}
 * Method:GET
 * Description:Getting the book information
 * Access:Public
 * Parameters:id
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => each.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: `User with id= ${id} doesnot exist`
        })
    }
    return res.status(200).json({
        success: true,
        data: book
    })

})
/**
 * Route:/users/:{id}
 * Method:POST
 * Description:Store a new book
 * Access:Public
 * Parameters:id
 */
router.post('/', (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(404).json({
            success: false,
            message: "Pls Enter the data"
        })
    }
    var id = data.id;
    const book = books.find((each) => each.id == id);
    if (book) {
        return res.status(404).json({
            success: false,
            message: `User with id=${id} already exit`
        })
    }
    books.push(data);
    return res.status(200).json({
        success: true,
        data: books
    })
})

/**
 * Route:/books/:id
 * Method:PUT
 * Description:Update the info of a book
 * Access:Public
 * Parameters:id
 */

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const book = books.find((each) => each.id == id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: `Books with this id=${id} does not exist`
        })
    }
    var updatedbook = { ...book, ...data };
    return res.status(200).json({
        success: true,
        updatebook: updatedbook
    })
})

/**
 * Route:/issued
 * Method:GET
 * Description:Get all the issued book
 * Access:Public
 * Parameters:None
 */
router.get('/issued/books',(req,res)=>
{   const userswithissuedbooks = users.filter((each)=>
    {
        if(each.issuedBook) return each;
        
    });
   
    var array = [];

    userswithissuedbooks.forEach((each)=>{
        var book = books.find((data)=> data.id===each.issuedBook);
        book.issuedby = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;
        array.push(book);  
    })
    
 res.status(200).json({
     success:true,
     data:array,
})
})


module.exports = router;