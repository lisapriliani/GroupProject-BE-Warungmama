const HistoryModel = require("../models/history.model")
const {dataToken} = require("../helpers")

class HistoryController { 
    static async viewHistory(req, res) {
        try {
            const token = dataToken(req,res)
            if(token.data.role === 'user'){
                const id = token.data._id
                const existHistory = await HistoryModel.find({userId: id})
                res.send(existHistory)
            }else{
                const existHistory = await HistoryModel.find()
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
            let {status, tanggalDiterima} = req.body
            const existHistory = await HistoryModel.findOne(filter)
            if(existHistory!== "Diterima"){
                if(token.data.role === 'admin'){
                    if(status === "Diantar"){
                        const editAdmin = await HistoryModel.findOneAndUpdate(filter, {status: status})
                        res.send('Status update success')
                    }else{
                        res.status(500).send('invalid status')
                    }
                }else{
                    if(status === "Diterima"){
                        const editUser = await HistoryModel.findOneAndUpdate(filter, {status: status, tanggalDiterima: tanggalDiterima})
                        res.send('Status update success')
                    }else{
                        res.status(500).send('invalid status')
                    }
                }
            }else{

            }
            
        } catch (error) {
            res.status(500).send(error)
        }
    }
}


module.exports = HistoryController