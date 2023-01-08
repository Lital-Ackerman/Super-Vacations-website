const whoLoggedReducer=(state="guest", action:any) =>{
    if(action.type=="NAME"){
        state= action.username
    }
    return state
}

export default whoLoggedReducer;