const db= require("mysql");

const pool= db.createPool({
    host: "localhost",
    user: "root",
    database: "vacationsdb"
});

//Execute request to DB
const executeQueryAsync=(sqlCmd)=>{
    return new Promise((resolve, reject)=>{
        pool.query(sqlCmd, (err, result)=>{
            if(err) {
                reject(err)
            }
            else{
                resolve(result)
            }
        })
    })
}

module.exports = {
    executeQueryAsync
}