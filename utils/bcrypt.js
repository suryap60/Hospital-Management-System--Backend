import bcrypt from 'bcrypt'

const generateHashedPassword = async (password)=>{
    return await bcrypt.hash(password,10)
}

const comparedPassword = async (password,userPassword)=>{
    return await bcrypt.compare(password,userPassword)
}

export { generateHashedPassword, comparedPassword }