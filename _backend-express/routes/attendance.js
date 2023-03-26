const express = require("express")
const router = express.Router()

router.get('/',(req,res)=>{
    res.send("this is attendance result")
})


module.exports = router