export default class Validate{
    
    isValidEmail=(email)=>{
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    validationStatus=(state,setValue)=>{
        let errors={};
        let formIsValid=true;
        if(!this.isValidEmail(state.email)){
            formIsValid=false;
            errors["email"]="Please enter a valid email address";
        }
        if(!state.email){
            formIsValid=false;
            errors["email"]="Please enter email address";
        }
        if(!state.password){
            formIsValid=false;
            errors["password"]="Please enter password";
        }
        setValue({...state,errors:errors})
        return formIsValid
    }
}