const io=require("socket.io");
const config= require("../config");
const dal= require ("../dal/dal")

let socketManager;

function init(listener) {
    socketManager=io(listener, {cors: {origin:'*'}});

    const updateMyList=async(updateMessage)=>{
        const updatedList= await dal.executeQueryAsync("SELECT * FROM vacations");
        socketManager.sockets.emit("vacations-update", {updatedList, updateMessage})
    }

    socketManager.sockets.on("connection", socket => {
        console.log("A client is connected ");
        console.log(`${socketManager.engine.clientsCount} connected`);
        
        module.exports.updateMyList= updateMyList;

        socket.on("disconnect", (reason) => {
            console.log("A client is disconnected");
            console.log(`${socketManager.engine.clientsCount - 1} connected`);

        });
    });
}

module.exports = {
    init
}