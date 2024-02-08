console.log("hrllp");
const express=require('express')
const path=require('path')
const cookieparser=require("cookie-parser")
const app=express()

const cors=require("cors")
// const productRoutes=require('./api/routes/products')
const userRoutes=require('./routes/user-routes');
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
const morgan = require('morgan');
const UserModel=require("./model/user")

app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(cookieparser())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(morgan("common"))
app.use("/api",userRoutes)

app.get('/',async(req,res)=>{
    try {
        const data=await UserModel.find();
        const newData=data.map(doc=>({
            id:doc._id,
            name:doc.name,
            password:doc.password
        }))
        res.status(200).json({
            count:data.length,
            newData
        })
    } catch (error) {
        res.status(500).json({
            message:"Oops!"
        })
    }
})

app.delete('/deleteall',async(req,res)=>{
    try {
        const data=await UserModel.deleteMany();
        res.status(200).json({
            message:"detetion Sucessfull",
            data
        })
    } catch (error) {
        res.status(500).json({
            message:"Oops!"
        })
    }
})



mongoose.connect("mongodb+srv://goluojhaMernAuth:ZEPclZZ9iBFdQQiV@cluster0.xymcxk6.mongodb.net/?retryWrites=true&w=majority").then(x=>{
    console.log("connected to mongosse")
}).catch(x=>{
    console.log("failed to connect wit the database")
})




app.get('/',(req,res)=>{
    res.send("app get /")
}) 
app.listen(5000,()=>{
    console.log('app started listening');  
})