const express= require("express");
const router= express.Router();
const fileUpload = require("express-fileupload");
const path=require("path");
const fs = require("fs");
const socketLogic= require("../service/socketLogic")
const bll= require("../bll/vacationBll");
const io=require("socket.io");
const { request } = require("http");
const Vacation = require("../model/vacation-model");
const socket = io();
const verifyLoggedIn= require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");


router.use(fileUpload());

//Get vacations List
router.get("/", verifyLoggedIn, async(request, response)=>{
    try{
        const result= await bll.getVacationsAsync();
        // socketLogic.updateMyList("Update- new Vacation!");        
        response.send(result)
    }
    catch(err){
        console.log(err);
        response.status(500).send( err);

    }
}
)


//Add new vacation by admin
router.post("/insert", [verifyLoggedIn, verifyAdmin], async(request, response)=>{
    try{
        const newVacation= new Vacation(request.body);
        let image= request.files.image;
        newVacation.image= image.name
        let absolutePath= path.join(__dirname, "..", "images", image.name );
        await image.mv(absolutePath); 
        const result= await bll.postVacationAsync(newVacation);
        socketLogic.updateMyList(`Update: new Vacation to ${newVacation.destination}!`);        
        response.send(result)
    }
    catch(err){
        console.log(err)
        response.status(500).send( err);
    }
})


//Edit vacation by admin
router.put("/edit/:id", [verifyLoggedIn, verifyAdmin], async(request, response)=>{
    try{
        const idToEdit= +request.params.id;
        const newVacation= new Vacation(request.body);
        let image= request.files.image;
        newVacation.image= image.name;
        let absolutePath= path.join(__dirname, "..", "images", image.name );
        await image.mv(absolutePath); 
        const result= await bll.putVacationAsync(idToEdit, newVacation);
        socketLogic.updateMyList(`Update: Some changes were made in Vacation to ${newVacation.destination}!`);        
        response.send(result)
    }
    catch(err){
        console.log(err);
        response.status(500).send( err);

    }
})


//Delete vacation by admin
router.delete("/delete/:id", [verifyLoggedIn, verifyAdmin], async(request, response)=>{
    try{
        const id= +request.params.id;
        const result= await bll.deleteVacationAsync(id);
        socketLogic.updateMyList(`Update: Vacation No.${id} was deleted!`);        
        response.send(result);
    }
    catch(err){
        console.log(err);
        response.status(500).send( err);
    }})


//Change followers number
router.patch("/patch/:id", verifyLoggedIn, async(request, response)=>{
    try{
        const idToPatch= +request.params.id;
        let followersUpdate= +(request.body.followers);
        let operator= request.body.operator;
        let newFollowers= operator=="+" ?followersUpdate+ 1 : followersUpdate-1;
        newFollowers<0 ? newFollowers=0 : null;
        const result= await bll.patchFollowersAsync(idToPatch, newFollowers);
        socketLogic.updateMyList(`followers Update!`);        
        response.send(result)
    }
    catch(err){
        console.log(err);
        response.status(500).send( err);

    }
})

    

module.exports= router;