const validatePassword = (password)=>{
    const passwordPattern =  /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordPattern.test(password)
} 

const validateEmail = (email)=>{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email)
}

export { validateEmail, validatePassword } 