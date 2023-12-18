const express = require("express");
const {users} = require("../data/users.json"); // importing Users data
const router = express.Router();

/**
 * Route:/users
 * Method:GET
 * Description:Getting the list of all users
 * Access:Public
 * Parameters:None
 */


router.get('/',(req,res)=>
{
    res.status(200).json({
        success:true,
        data: users
    })
})
/**
 * Route:/users/:{id}
 * Method:GET
 * Description:Getting the user information
 * Access:Public
 * Parameters:id
 */
router.get('/:id',(req,res)=>
{
    const {id}  = req.params;
    const user = users.find((element)=>element.id === id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"The user with this id doesnot exist"
        })
    }
    return res.status(200).json({
        success:true,
        data: user
    })
})
/**
 * Route:/users
 * Method:POST
 * Description:to add a new user
 * Access:Public
 * Parameters:None
 */
router.post('/',(req,res)=>
{
    const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
   const user = users.find((ele)=>ele.id == id);
    if(user){
        return res.status(404).json({
            message:"Already Exist"
        })
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });
    
    return res.status(201).json({
        message:"Added"
    })
    
})
/**
 * Route:/users
 * Method:PUT
 * Description:To update a user with id
 * Access:Public
 * Parameters:id
 */
router.put('/:id',(req,res)=>
{
    const {id} = req.params;
    const {data} = req.body;
    const user = users.find((each)=>each.id === id);
    if(!user){
        return res.status(404).json({
        success:false,
        message:"User Not Found!!"
        })
    }
   const updatedUser =  users.map((each)=>
    {
        if(each.id === id){
            return{
            ...each,
            ...data};
            
        }
        return each;
    })
    return res.status(200).json({
        success:true,
        message:`User with ${id} is updated`,
        use:updatedUser
    })
})
/**
 * Route:/users
 * Method:Delete
 * Description:To delete a user with id
 * Access:Public
 * Parameters:id
 */
router.delete('/:id',(req,res)=>
{
    const {id} = req.params;
    const user = users.find((each)=>each.id === id);
    if(!user){
        return res.status(404).json({
        success:false,
        message:"User Not Found!!"
        })
    }
    const index = users.indexOf(user);
    users.splice(index,1);
    return res.status(200).json({
        success:true,
        message:`User with the id ${id} is deleted from the database`,
        user:users
    })
})

module.exports = router;