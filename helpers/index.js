const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './.env' })
const {secretkey} = process.env
const generateToken = (data) => {
    const token = jwt.sign({data}, secretkey, {
        expiresIn: '1h'
    });
    return token;
}
const verifyToken = (req,res,next)=>{
    try {
        const token = req.headers.authorization
        const id = req.params.id
        const verify = jwt.verify(token.split(" ")[1], secretkey);
        if(verify){
            next()
        }else{
            console.log('token error')
        }
    } catch (error) {
        console.log(error)
    }   
}
const dataToken = (req,res)=>{
    try {
        const token = req.headers.authorization
        const verify = jwt.verify(token.split(" ")[1], secretkey)
        return verify
    } catch(error){
        console.log('invalid token')
    }
}
const verifyTokenWithId = (req,res,next)=>{
    try {
        const token = req.headers.authorization
        const id = req.params.id
        const verify = jwt.verify(token.split(" ")[1], secretkey);
        if(verify.data._id === id){
            res.send({data: verify, id: id})
            next()
        }else{
            console.log('forbidden')

        }
    } catch(error){
        console.log(error)
    }   
}
const allowedAdmin = (req,res,next)=>{
    try {
        const token = req.headers.authorization
        const verify = jwt.verify(token.split(" ")[1], secretkey);
        if(verify.data.role === "admin"){
            next()
        }else{
            console.log('forbidden user')
        }
    } catch (error) {
        console.log(error)
    }
}

const allowedUser = (req,res,next)=>{
    try {
        const token = req.headers.authorization
        const verify = jwt.verify(token.split(" ")[1], secretkey);
        if(verify.data.role === "user"){
            next()
        }else{
            console.log('forbidden admin')
        }
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    generateToken : generateToken,
    verifyToken: verifyToken,
    verifyTokenWithId: verifyTokenWithId,
    dataToken: dataToken,
    allowedAdmin: allowedAdmin,
    allowedUser: allowedUser    
}