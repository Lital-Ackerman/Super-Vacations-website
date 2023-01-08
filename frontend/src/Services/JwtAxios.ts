import axios from "axios";

//Insert token to headers in every request
const jwtAxios= axios.create();

jwtAxios.interceptors.request.use(request => {
    if(localStorage.loginData){
        const loginData= JSON.parse(localStorage.loginData);
        request.headers = {
            authorization: "Bearer " + loginData
        };
    }
    return request;
})

export default jwtAxios;