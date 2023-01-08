const express= require("express");
const cors= require("cors");
const config= require("./config");
const server= express();
const vacationsController= require("./controllers/vacationController");
const usersController= require("./controllers/usersController");
const imageController= require("./controllers/imageController")
const port=config.port;


//Socket
const socketLogic= require("./service/socketLogic");

server.use(cors());
server.use(express.json());

//Controllers
server.use("/vacations", vacationsController);
server.use("/users", usersController);
server.use("/images", imageController);

server.use("*", (req,res)=>{
    res.status(400).send(`Rout not found ${req.originalUrl} `)
});


const listener= server.listen(port, ()=>{
    console.log(`Listening on ${port}`)
}).on("error", (err)=>{
    console.log(err);
    if(err.code==="EADDRINUSE")
        console.log("Error: Address in use")
    else
        console.log("Error: Unknown error")
})

socketLogic.init(listener);


