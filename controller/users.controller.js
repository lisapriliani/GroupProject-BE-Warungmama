const UsersModel = require("../models/users.model")
const bcrypt = require("bcrypt")
const saltRounds = 10
const {generateToken, verifyToken} = require("../helpers")

class UsersController { 
    static async registerUser(req, res) {
        
        try {
            let {nama, email, password} = req.body
            const emailExist = await UsersModel.findOne({email: email})
            if (emailExist === null){
                password = bcrypt.hashSync(password, saltRounds)
                const users = new UsersModel({nama: nama, email: email, password: password})
                const saved = await users.save()
                res.status(201).send(saved);
            }else{
                res.send('duplicate email')
            }            
        } catch (error) {
            res.status(500).send({err: error})
        }
    }

    static async loginUser(req, res) {
        try {
            let {email, password} = req.body
            const existUser = await UsersModel.findOne({email: email})
            if(existUser !== null){
                let compare = bcrypt.compareSync(password, existUser.password)
                if(compare){
                    const tokenUser = {
                        _id: existUser._id,
                        role: "user"
                    }
                    const createToken = generateToken(tokenUser)
                    res.status(200).send({message: "welcome", token: createToken})
                }else{
                    res.send('invalid')
                }
            }  
            
        } catch (error) {
            res.status(500).send({err: error})
        }
    }
    static async profileUser(req, res) {
        try {
            const id = req.params.id
            const existUser = await UsersModel.findOne({_id: id})
            res.send(existUser)   
        } catch (error) {
            res.status(500).send({err: error})
        }
    }

    static async editProfileUser(req,res){
        try {
            const id = req.params.id
            let {nama, email, password} = req.body
            const filter = {_id: id}
            const update = {nama: nama, email:email, password:password}
            await UsersModel.findOneAndUpdate(filter, update)
            res.status(200).send({message: "success"});
        } catch (error) {
            res.send(error)
        }
    }
    static async testAuthor(req,res){
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
}


module.exports = UsersController