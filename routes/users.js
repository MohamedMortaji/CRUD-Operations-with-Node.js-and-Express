const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
    res.send(JSON.stringify({users}, null, 4));
});


// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
    let [dd, mm, yyyy] = strDate.split('-');
    return new Date(yyyy + "/" + mm + "/" + dd);
}
// Define a route handler for GET requests to the "/sort" endpoint
router.get("/sort", (req, res) => {
    // Sort the users array by DOB in ascending order
    let sorted_users = users.sort(function(a, b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
        return d1 - d2;
    });
    // Send the sorted_users array as the response to the client
    res.send(JSON.stringify({users}, null, 4));
});


// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  let singleUser = users.filter((user) => user.email === req.params.email);
  res.send(singleUser);  
});

router.get("/lastName/:lastName",(req,res)=>{
    let singleUser = users.filter((user) => user.lastName === req.params.lastName);
    res.send(singleUser);  
  });

// POST request: Create a new user
router.post("/",(req,res)=>{
    users.push({
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "email":req.query.email,
        "DOB":req.query.DOB
    });
    res.send("The User has been added with email: " + req.query.email);
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    const email = req.params.email;
    let filteredUsers= users.filter((user) => user.email == email);

    if(filteredUsers.length>0){
        let filteredUser = filteredUsers[0];

        let DOB = req.query.DOB;
        if(DOB){
            filteredUser.DOB=DOB;
        }
        users = users.filter((user) => user.email != email);
        users.push(filteredUser);
        res.send(`User with the email ${email} updated.`);
    }else{
        res.send("Unable to find user!");
    }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    const email = req.params.email;
    users= users.filter((user) => user.email != email);
    res.send("User with email "+ email + "Deleted.");
});

module.exports=router;
