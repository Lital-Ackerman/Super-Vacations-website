const express= require("express");
const router= express.Router();
const fileUpload = require("express-fileupload");
const path=require("path");
const fs = require("fs");

router.use(fileUpload());

//Get default image when original image is undefined.
router.get("/", (request, response)=>{
    try{
    let imageNotFound = path.join(__dirname, "../images", "not-found-image.jpg");
    response.sendFile(imageNotFound);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
})

//Get vacation image (including when it's defined but missing in server)
router.get("/:imageName", (request, response)=>{
    try{
    const imageName= request.params.imageName;
    let imageFile= path.join(__dirname, "../images", imageName);
    let imageNotFound = path.join(__dirname, "../images", "not-found-image.jpg");
    if ((!fs.existsSync(imageFile)))  imageFile = imageNotFound;
    response.sendFile(imageFile);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
})

module.exports= router;