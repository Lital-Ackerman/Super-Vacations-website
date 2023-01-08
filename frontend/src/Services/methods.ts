import Vacation from '../Model/vacation-model';
import jwtAxios from './JwtAxios';


//Get vacations
export async function getVacations() {
  try {
        const response = await jwtAxios.get<Vacation[]>("http://localhost:4000/vacations");
        let myList= response.data;
        return myList
      } 
  catch (err) {
      console.log(err)
      }
    }

    //Get followed vacations

    export async function getFollowedVacations(id: number) {
        try{
              const response= await jwtAxios.get(`http://localhost:4000/users/getFollowedV/${id}`);
              let followedV = response.data;
              let followedVacations= followedV && followedV.length>0 ?JSON.parse(followedV[0].followV)  :  [];    
              return followedVacations;
          }
        catch(err){
              console.log(err);
          }
      }

      //Set followed vacations to user in the DB

    export async function setToDB(followedV:number[], username:string){
      try{
          const response= await jwtAxios.patch(`http://localhost:4000/users/setFollowedV/${username}`, followedV);
          }
      catch(err:any){
          let message= JSON.stringify(err.response.data, null, " ");
        alert(message);
        console.log(message);
        if(err.response.data=="Your login session has expired")
              window.location.reload() 
          }
      }


      
