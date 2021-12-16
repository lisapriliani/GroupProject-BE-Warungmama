const jwt = require('jsonwebtoken')
const generateToken = (data) => {
    const token = jwt.sign({data}, process.env.secretkey, {
        expiresIn: '1h'
    });
    return token;
}
const verifyToken = (req,res,next)=>{
    const token = req.headers.authorization
    

    try {
        const verify = jwt.verify(token.split(" ")[1], process.env.secretkey);
        req.user = verify;
        console.log(verify)
        if(verify){
            next()
        }
    } catch (error) {
        return res.status(401).send({
            error: error
        });
    }
    
}
module.exports = {
    generateToken : generateToken,
    verifyToken: verifyToken    
}