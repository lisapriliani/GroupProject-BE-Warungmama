const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true    
    },
    password: {
        type: String,
        required: true
    },
    wishlistId: [{
        type: mongoose.Types.ObjectId,
        ref: 'Wishlist',
        default: []
    }],
    keranjangId: [{
        type: mongoose.Types.ObjectId,
        ref: 'Keranjang',
        default: []
    }],
    historyId: [{
        type: mongoose.Types.ObjectId,
        ref: "History",
        default: []
    }] 

}, {
    timestamps: true,
    versionKey: false
})


const UserModel = mongoose.model("User", usersSchema)
module.exports = UserModel