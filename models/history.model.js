const mongoose = require("mongoose")


let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;

const ProdukSchema = new mongoose.Schema({
    productID : {
      type: mongoose.Types.ObjectId,
      ref: 'Products'
    },
    qty: Number
  }, { _id : false })

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    produk: [ProdukSchema],
    statusPemesanan: {
        type: String,
        enum: ["Dipesan", "Diantar", "Diterima"],
        default: 'Dipesan'
    },
    alamat: {
        type: String,
    },
    metodePembayaran:{
        type: String,
        enum: ["transfer", "COD"]
    },
    statusPembayaran: {
        type: String,
        enum: ["Belum bayar", "Sudah bayar"]
    },
    tanggalPembelian: {
        type: String,
        default: dateTime
    },
    tanggalDiterima: {
        type: String,
        default: null
    },
    metodePengambilan: {
        type: String,
        enum: ["ambil ditempat", "delivery"]
    } 
}, {
    timestamps: true,
    versionKey: false
})


const HistoryModel = mongoose.model("History", historySchema)
module.exports = HistoryModel