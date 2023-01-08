const dal= require("../dal/dal");

const getVacationsAsync=()=>{
    return dal.executeQueryAsync(`
        SELECT *
        FROM vacations
    `)
}

const postVacationAsync=(newVacation)=>{
    let errors= newVacation.validate();
    if(errors) throw errors;
    return dal.executeQueryAsync(`
    INSERT INTO vacations
    (destination, description, image, startDate, endDate, price)
    VALUES ('${newVacation.destination}', '${newVacation.description}', '${newVacation.image}', '${newVacation.startDate}', '${newVacation.endDate}', '${newVacation.price}' )
    `)
}

const putVacationAsync=(idToEdit, editVacation)=>{
    let errors= editVacation.validate();
    if(errors) throw errors;
    return dal.executeQueryAsync(`
    UPDATE vacations
    SET description='${editVacation.description}',
    destination='${editVacation.destination}',
    image='${editVacation.image}',
    startDate='${editVacation.startDate}', 
    endDate='${editVacation.endDate}',
    price='${editVacation.price}'
    WHERE vacationID='${idToEdit}'
    `)
}

const deleteVacationAsync=(idToDelete)=>{
    return dal.executeQueryAsync(`
    DELETE FROM vacations 
    WHERE vacationID= '${idToDelete}'
    `)

}

const patchFollowersAsync=(idToPatch, followers)=>{
    return dal.executeQueryAsync(`
    UPDATE vacations 
    SET followers= '${followers}'
    WHERE vacationID= '${idToPatch}'
    `)

}

module.exports={
    getVacationsAsync,
    postVacationAsync,
    putVacationAsync,
    deleteVacationAsync,
    patchFollowersAsync
}