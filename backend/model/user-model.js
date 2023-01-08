const bll= require("../bll/usersBll");


class User{
    constructor(firstName, lastName, userName, password/* , isAdmin */){

        if(arguments.length>1){
            this.firstName= firstName;
            this.lastName= lastName;
            this.userName= userName;
            this.password= password;
        }
        else{
            let user= arguments[0];
            this.firstName=user.firstName;
            this.lastName= user.lastName;
            this.userName= user.userName;
            this.password= user.password;
        }
    }

     async validateDouble(){
        let isExist= await bll.getIsRegisterAsync(this.userName);
        if (isExist.length>0)
        return "Username is already exist";
        else return null
    
    }

    
    validateCredentials(){
        const errors={};
        if(this.firstName && this.firstName.length<2)
        errors.firstName= "first Name should be >2";

        if(this.lastName && this.lastName.length<2)
        errors.lastName= "last Name should be >2";

        if(this.userName && this.userName.length<4)
        errors.userName= "UserName should be >3";

        if(this.password && this.password.length<6)
        errors.password= "Password Should be >5!";

        const errorsLength= Object.keys(errors).length
        if(errorsLength<=0) return null
        else return errors;
    }
    
}

module.exports= User;