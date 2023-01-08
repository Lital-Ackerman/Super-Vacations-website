const express= require("express");
const router= express.Router();
const bll= require("../bll/usersBll");
const Credentials = require("../model/credentials");
const User=require("../model/user-model")
const verifyLoggedIn= require("../middleware/verify-logged-in")
const jwt = require("jsonwebtoken");
const config = require("../config");


//Auto Login when user token is valid
router.post("/autoLogin", async(request, response)=>{
    console.log(request.body);
    try{
    const lastUserToken= request.body.lastUserToken;
    let lastUserData= jwt.decode(lastUserToken);
    const expiryToken= new Date(0);
    expiryToken.setUTCSeconds(lastUserData.exp);

        if (expiryToken> new Date()){
            response.send(lastUserData.user)
        }else{
            response.send("token not valid")
        }
    }
    catch(err){
        response.status(500).send(err.message);
    }
})


//Login
router.post("/login", async(request, response)=>{
    try{
        const credentials = new Credentials(request.body);
        const errors= credentials.validate();
        if(errors) return response.status(400).send(errors);
        const loggedInUser= await bll.postLoginUserAsync(credentials);
        if (!loggedInUser) return response.status(401).send("Incorrect username or password.");
        response.json(loggedInUser);
    }
    catch(err){
        console.log(err);
        response.status(500).send(err.message);
    }
})


//Register
router.post("/register", async(request, response)=>{
    try{
        const newUser= new User(request.body);
        let isExist= await newUser.validateDouble();
        if(isExist){
            response.status(400).send(isExist);
        }
        else{
            const result= await bll.postNewUserAsync(newUser);
            response.send(result);
        }
    }
    catch(error){
        console.log(error);
        response.status(500).send(error);
    }
})

//Get followed vacations by user
router.get("/getFollowedV/:id", verifyLoggedIn,  async(request, response)=>{
    try{
        const id= request.params.id;
        const followedVacations= await bll.getFollowedVacationsAsync(id);
        response.send(followedVacations);
    }
    catch(err){
        console.log(err)
    }
        
})

//Update followed vacations by user
router.patch("/setFollowedV/:username", verifyLoggedIn,  async(request, response)=>{
    try{
        const username= request.params.username;
        const followedVacations= JSON.stringify(request.body);
        const result= await bll.patchFollowedVacationsAsync(username, followedVacations);
        response.send(result);
    }
    catch(err){
        console.log(err)
    }
        
})


module.exports= router;