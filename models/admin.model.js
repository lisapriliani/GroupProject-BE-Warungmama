const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    nama: {
        type: String,
    },
    email: {
        type: String    
    },
    password: {
        type: String,
    } 
}, {
    timestamps: true,
    versionKey: false
})


const AdminModel = mongoose.model("Admin", adminSchema)
module.exports = AdminModel