const validatePassword = (password)=>{
    const passwordPattern =  /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordPattern.test(password)
} 

const validateEmail = (email)=>{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email)
}

const validateMobileNumber = (phone) =>{
    const mobileNumberPattern =  /^\d{10}$/ ;
    return mobileNumberPattern.test(phone)
}

export { validateEmail, validatePassword, validateMobileNumber } 