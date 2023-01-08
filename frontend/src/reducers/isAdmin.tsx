const isAdminReducer=(state:boolean=false, action:any) =>{
    switch(action.type) {
        case "ADMIN":
            state= true
            break;
        case "USER":
            state= false
            break;
    }
    return state
}

export default isAdminReducer;