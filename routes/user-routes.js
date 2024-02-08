const express=require("express")
const router=express.Router()
const {signup,login,varification,getUser,refreshToken}= require("../controller/user-controller")

router.get("/",(req,res,next)=>{
    // res.send("user router")
    const cookies=req.headers.cookie
    // console.log(cookies);//fomat is id=token
    const token=cookies.split("=")[1]
    console.log(token)
    res.json({
        token
    })
})
router.post("/signup",signup)
router.post("/login",login)
router.get('/user',varification)
router.get('/getuser',varification,getUser)
router.get('/refresh',refreshToken,varification,getUser)
// verify tokens
module.exports=router