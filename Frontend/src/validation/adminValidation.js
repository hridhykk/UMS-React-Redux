import { toast } from "react-toastify";
import { showToastMessage } from "./Toast";

const adminValidation =({email,password,toast})=>{
    const trimEmail = email.trim()
    const trimPassword = password.trim()

    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


    if(trimEmail === '' || trimPassword === ''){
        showToastMessage('All Fileds Are Required','error')
    }else if(!emailRegex.test(trimEmail)){
        showToastMessage('Invalid Email','error')
    }else{
        return true
    }
}

export default adminValidation