const bll= require("../bll/vacationBll");

class Vacation{
    constructor(destination, description, image, startDate, endDate, price, /* isAdmin */){

        if(arguments.length>1){
            this.destination= destination;
            this.description= description;
            this.image= image;
            this.startDate= startDate;
            this.endDate= endDate;
            this.price= price;
        }
        else{
            let vacation= arguments[0];
            this.destination= vacation.destination;
            this.description=vacation.description;
            this.image= vacation.image;
            this.startDate= vacation.startDate;
            this.endDate= vacation.endDate;
            this.price= vacation.price;
        }
        }

        validate(){
            const errors={};
            let today= new Date();
            if(this.destination && this.destination.length<4)
            errors.destination= "Destination should be >4";

            if(this.description && this.description.length<10)
            errors.description= "Description should be >10";

            if(!this.image)
            errors.destination= "Image is missing";
            
            if(this.startDate && new Date(this.startDate)<today)
            errors.startDate= "Invalid Date- Please Insert a future Date!";

            if(this.endDate && new Date(this.endDate)< new Date(this.startDate))
            errors.EndDate= `End Date should be after ${new Date(this.startDate).toLocaleString('en-US').substring(0, 10)}!`;

            if(this.price && this.price<100)
            errors.price= "Price should be >100";

            const errorsLength= Object.keys(errors).length
            if(errorsLength<=0) return null
            else return errors;
        }
    }

module.exports= Vacation;