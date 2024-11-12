import { showToastMessage } from "./Toast"

const userRegValidation  = ({name,email,mobile,password,confirmPassword,toast})=>{
    const trimName = name.trim()
    const trimEmail = email.trim()
    const trimMobile = mobile.trim()
    const trimPassword = password.trim()
    const trimConfirmPass = confirmPassword.trim()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const mobileRegex = /^(91)?0?[6-9]\d{9}$/


    if(trimName === '' || trimEmail === '' || trimMobile === '' || trimPassword === '' || trimConfirmPass === ''){
        return showToastMessage("All Fields Are Required",'error')
    }else if(trimConfirmPass !== trimPassword){
        return showToastMessage("Passwords not matching",'error')
    }else if(!emailRegex.test(trimEmail)){
        return showToastMessage("Invalid Email Address",'error')
    }else if(!mobileRegex.test(trimMobile) && trimMobile.length === 10){
        return showToastMessage("Enter valid Mobile Number",'error')
    }else if(!mobileRegex.test(trimMobile)){
        return showToastMessage("Invalid Mobile Number",'error')
    }else if(!passwordRegex.test(trimPassword)){
        return showToastMessage("Enter a strong Password",'error')
    }else{
        return true
    }
    
                                                        
}

export default userRegValidation