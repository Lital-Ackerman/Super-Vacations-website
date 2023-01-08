const dal= require("../dal/dal");
const jwt= require("jsonwebtoken");
const config= require("../config");


const getIsRegisterAsync=(username)=>{
    return dal.executeQueryAsync(`
    SELECT * 
    FROM users 
    WHERE username= '${username}'  
`)
}
const postLoginUserAsync= async (credentials)=>{
    const user= await dal.executeQueryAsync(`
        SELECT * 
        FROM users 
        WHERE userName= '${credentials.username}' 
        AND password= '${credentials.password}' 
    `)
    console.log(user);
    if(!user || user.length<1) return null;
    delete user[0].password;

    user[0].token = jwt.sign({user:user[0]}, config.jwtKey, {expiresIn: "30 minutes"});
    console.log(user);

    return user[0];
}

const postNewUserAsync=(newUser)=>{
    let errors= newUser.validateCredentials();
    if (errors)
        throw errors;

    return dal.executeQueryAsync(`
        INSERT into users (firstName, lastName, userName, password)
        VALUES ('${newUser.firstName}', '${newUser.lastName}', '${newUser.userName}', '${newUser.password}')
    `)
}

const getFollowedVacationsAsync=(id)=>{
    return dal.executeQueryAsync(`
    SELECT followV 
    FROM users 
    WHERE userID= '${id}'  
`)
}

const patchFollowedVacationsAsync=(username, followedV)=>{
    return dal.executeQueryAsync(`
    UPDATE users 
    SET followV= '${followedV}'
    WHERE userName= '${username}'  
        `)
}


module.exports={
    postLoginUserAsync,
    getIsRegisterAsync,
    postNewUserAsync,
    getFollowedVacationsAsync,
    patchFollowedVacationsAsync
}