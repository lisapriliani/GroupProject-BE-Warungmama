const HistoryModel = require("../models/history.model")
const {dataToken} = require("../helpers")

class HistoryController { 
    static async viewHistory(req, res) {
        try {
            const token = dataToken(req,res)
            if(token.data.role === 'user'){
                const id = token.data._id
                const existHistory = await HistoryModel.find({userId: id}).populate({
                    path: "produk",
                    populate: {
                        path: "productID"
                    }
                })
                res.send(existHistory)
            }else{
                const existHistory = await HistoryModel.find().populate([
                    {
                        path: "produk",
                        populate: {
                            path: "productID"
                        }
                    },
                    {
                        path: "userId"
                    }
                ])
                res.send(existHistory)
            } 
        } catch (error) {
            res.status(500).send({err: error})
        }
    }
    static async editHistory(req,res){
        try {
            const token = dataToken(req,res)
            const idHistory = req.params.id
            const filter = {_id: idHistory}
            let {statusPemesanan, statusPembayaran} = req.body
            const existHistory = await HistoryModel.findOne(filter)
            if(existHistory.statusPemesanan !== "Diterima"){
                if(token.data.role === 'admin'){
                    if(statusPemesanan === "Diantar"){
                        const editAdmin = await HistoryModel.findOneAndUpdate(filter, {statusPemesanan: statusPemesanan, statusPembayaran: statusPembayaran})
                        res.send('Status update success')
                    }else{
                        res.status(500).send('invalid status')
                    }
                }else{
                    if(statusPemesanan === "Diterima"){
                        let today = new Date();
                        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        let dateTime = date+' '+time;

                        const editUser = await HistoryModel.findOneAndUpdate(filter, {statusPemesanan: statusPemesanan, tanggalDiterima: dateTime})
                        res.send('Status update success')
                    }else{
                        res.status(500).send('invalid status')
                    }
                }
            }else{
                res.status(500).send('invalid')
            }
            
        } catch (error) {
            res.status(500).send(error)
        }
    }
}


module.exports = HistoryController