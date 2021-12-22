const AdminModel = require("../models/admin.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const DBconnection = require("../config/index")
require('dotenv').config({ path: '../.env' })
const {uri} = process.env
const saltRounds = 10


const AdminData = [   
  new AdminModel({
    nama: "admin",
    email : "admin@mail.com",
    password: bcrypt.hashSync("admin123", saltRounds)
}),]

async function createSeeder(){
    try {
        await DBconnection(uri)
        const existData = await AdminModel.find()
        if(existData.length === 0){
            await AdminData.map(async (data, index) => {
                    await data.save((err, result) => {
                        console.log(result)
                    });
            });
        } else {
            console.log('data is exist')
        }
    } catch (error) {
        console.log(error)
    }
}

createSeeder()