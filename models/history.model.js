const mongoose = require("mongoose")


let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
    },
    produk: [{
        type:mongoose.Types.ObjectId,
        qty: String     
    }],
    status: {
        type: String,
        enum: ["Dipesan", "Diantar", "Diterima"]
    },
    alamat: {
        type: String,
    },
    metodePembayaran:{
        type: String,
        enum: ["transfer", "COD"]
    },
    tanggalPembelian: {
        type: String,
        default: dateTime
    },
    tanggalDiterima: {
        type: String,
    },
    metodePengambilan: {
        type: String,
        enum: ["ambil ditempat", "delivery"]
    } 
}, {
    timestamps: true,
    versionKey: false
})


const HistorySchema = mongoose.model("History", historySchema)
module.exports = HistorySchema