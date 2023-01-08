import Vacation from "../Model/vacation-model";

const vListReducer=(state:Vacation[]=[], action:any) =>{
    if(action.type=="UPDATE_LIST") {
            state= action.vList;
            let vIn:Vacation[]=[];
            let vOut:Vacation[]=[];
            state.forEach((v:Vacation)=>
            (action.followedV).includes(v.vacationID) 
            ? vIn.push(v)
            : vOut.push(v));
            state= [...vIn, ...vOut]
            // state= []
    }    
    return state
}
export default vListReducer;


//another sort option :
      // state= (state.slice().sort((v1:Vacation, v2:Vacation)=>{
            //     return ((action.followedV).includes(v1.vacationID) && (action.followedV).includes(v2.vacationID)) 
            //     ? 0  
            //     : (action.followedV).includes(v1.vacationID) 
            //             ? -1 
            //             : (action.followedV).includes(v2.vacationID) ? 1 : 0;
            // }))
