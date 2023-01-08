import axios from "axios";

const followUpReducer=(state:number[]=[], action:any) =>{
    switch(action.type){
    case "FOLLOW":
        let isExist= state.find(id=>id==action.vId);
        if (!isExist){
            state=[...state, action.vId];
        };
        break;

    case "UNFOLLOW":
        state= state.filter(id=>id!=action.vId);
        break;

    case  "SETFOLLOW":
        state= action.followedVacations;
    }
    return state
}

export default followUpReducer;