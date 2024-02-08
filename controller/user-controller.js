const User=require("../model/user")
const crypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
// const coock
const jwtSecret="mykey"


const signup=async(req,res,next)=>{
    const {name,email,password}=req.body
    const hashedpasssword=crypt.hashSync(password)
    const usedata={name,email,password:hashedpasssword};
    console.log("usedata",usedata);
    let present;
// email uniqueness check
try {
       present= await User.find({email});
      console.log("present",present)
      if(present.length)
        return res.status(200).json({
            present:true,
            message:"user alredy exist of same email",
            user:present  
        })
} catch (error) {
 res.status(404).json({message:error})  

console.log(error)
}


    const user=new User(usedata)
    if(!present.length)
    try {
        const data=await user.save();
        res.status(200).json({
            message:"new user added",
            userDetails:data
        })
    } catch (error) {
        return res.status(500).json({
            res:error
        })
    }
}

const login=async(req,res,next)=>{
    const {email,password}=req.body
    const hashedpasssword=crypt.hashSync(password)
    const usedata={email,password};
    // console.log(usedata)
    try {
        const found=await User.findOne({email});
        // console.log(found)
        const isPasswordCorrect=crypt.compareSync(password,found.password)
        if(isPasswordCorrect)
        {
        const token=jwt.sign({id:found._id},jwtSecret,{
            expiresIn:"35s" })
        
            if(req.cookies[`${found.id}`]){
                req.cookies[`${found.id}`]="" 
            }
        console.log(req.cookies[`${found.id}`]);
        
       let cok= res.cookie(String(found._id),token,{
            path:"/",
            expires:new Date(Date.now()+ 1000*30),
            httpOnly:true,
            sameSite:'lax' 
        })
        // console.log(cok)
        console.log(token)
        return    res.status(200).json({
                message:"successfully logged in",
                id:found._id,
                name:found.name,
                email:found.email,
                password,
                token
            })
        }
        else
        res.status(401).json({
            message:"password incorrect"
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }

}

const varification=(req,res,next)=>{
    console.log("varifying...")
    const cookies=req.headers.cookie
    // console.log(cookies);//fomat is id=token 2
    let token=undefined;
    if(cookies)//when token timing is exprired cookies is null
     token=cookies.split("=")[1]
    // console.log(token)

    // for using in postman 1
    // const headers=req.headers['authorization']
    // const token=headers.split(" ")[1]
    // // console.log(headers)
    if(!token)
    return res.json({
        message:"not valid token"
    })
    jwt.verify(String(token),jwtSecret,(err,user)=>{
        if(err)//err when token in cookie is wrong
        return res.json({
            // user,
            message:"unauthorized"
        })
        else
        {
        req.id=user.id;
        console.log("varification done")
    }
})
next()
}

const getUser=async(req,res,next)=>{
    const userId=req.id
    let user;
    try {
        user=await User.findById(userId,"-password -_id -__v")
        if(user)
       return res.status(200).json({
            user
        })
        console.log(user)
    } catch (error) {
        console.log(error);
       return res.status(404).json({
            error
        })
    }
    res.status(500).json({
        status:"500" 
    })
}

const refreshToken=(req,res,next)=>{
    const cookies=req.headers.cookie
    // console.log("cookies",cookies);
    let prevToken=undefined;
    if(cookies)
     prevToken=cookies.split("=")[1]
console.log("prevToken", prevToken=="undefined"||!prevToken);

     if(prevToken=="undefined"||!prevToken)
     return res.status(400).json({message:"could not find token"})
     else
     jwt.verify(String(prevToken),jwtSecret,(err,user)=>{
        if(err)
        return res.status(403).json({message:"authentication failed"})
        console.log(user)
        
        res.clearCookie(`${user.id}`)
        req.cookies[`${user.id}`]=""
        // console.log("coockedd ",res.cookie)
        const token=jwt.sign({id:user.id},jwtSecret,{
            expiresIn:"30s" })

        let cok= res.cookie(String(user.id),token,{
            path:"/",
            expires:new Date(Date.now()+ 1000*30),
            httpOnly:true,
            sameSite:'lax' 
        })
        req.id=user.id;
        next()
     })
}
module.exports={signup,login,varification,getUser,refreshToken} 