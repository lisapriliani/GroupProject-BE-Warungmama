const UsersModel = require("../models/users.model")
const bcrypt = require("bcrypt")
const saltRounds = 10
const {generateToken, verifyToken} = require("../helpers")

class UsersController { 
    static async registerUser(req, res) {
        
        try {
            let {nama, email, password, historyId, wishlistId, keranjangId} = req.body
            const emailExist = await UsersModel.findOne({email: email})
            if (emailExist === null){
                password = bcrypt.hashSync(password, saltRounds)
                const users = new UsersModel({nama: nama, email: email, password: password, historyId: historyId, wishlistId: wishlistId, keranjangId: keranjangId})
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
            console.log(existUser)
            if(existUser !== null){
                let compare = bcrypt.compareSync(password, existUser.password)
                console.log(compare)
                if(compare){
                    const createToken = generateToken(existUser)
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