const AdminModel = require("../models/admin.model")
const bcrypt = require("bcrypt")
const saltRounds = 10
const {generateToken, dataToken} = require("../helpers")

class AdminController { 
    static async loginAdmin(req, res) {
        try {
            let {email, password} = req.body
            const existAdmin = await AdminModel.findOne({email: email})
            if(existAdmin !== null){
                let compare = bcrypt.compareSync(password, existAdmin.password)
                if(compare){
                    const tokenAdmin = {
                        _id: existAdmin._id,
                        role: "admin"
                    }
                    const createToken = generateToken(tokenAdmin)
                    res.status(200).send({message: "welcome", token: createToken})
                }else{
                    res.send('invalid')
                }
            }else{
                res.send('admin not exist')
            }  
        } catch (error) {
            res.status(500).send({err: error})
        }
    }
    static async viewProfileAdmin(req, res) {
        try {
            const existAdmin = await AdminModel.find()
            res.send(existAdmin)
        } catch (error) {
            res.status(500).send({err: error})
        }
    }
    static async editProfileAdmin(req,res){
        try {
            const id = req.params.id
            let {nama, email, password} = req.body
            password = bcrypt.hashSync(password, saltRounds)
            const filter = {_id: id}
            const update = {nama: nama, email:email, password:password}
            const admin = await AdminModel.findOneAndUpdate(filter, update)
            res.status(200).send({message: "success"});
        } catch (error) {
            res.send(error)
        }
    }
    
}


module.exports = AdminController