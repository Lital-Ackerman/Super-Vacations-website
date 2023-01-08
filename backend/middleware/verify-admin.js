
//Some actions are allowed only for admin
function verifyAdmin(request, response, next){
    console.log(request.user)
    if(request.user && request.user.isAdmin== 1)
        next();
    else{
        return response.status(401).send("Unauthorized for admin Action! Please Login again.");
    }
}

module.exports = verifyAdmin;