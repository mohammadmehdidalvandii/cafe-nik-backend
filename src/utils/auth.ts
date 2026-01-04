import {hash , compare} from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface MyTokenPayload extends jwt.JwtPayload{
    data:{id:string , [key:string]:unknown}
};

const securityCode = process.env.SRC_CODE || "AKLSNDKLANSDKLNASKDNKASNKLDNLASNDKLASNKLDNKASLNDKLSANKDLASKNDKLASNKLAMCMAKSLMKL";

if(!securityCode){
    throw new Error('Security code is not found')
};

const generateAccessToken = (data:Record<string,any>)=>{
    try{
        const token = jwt.sign({data}, securityCode ,{expiresIn:'15m'})
        return  token
    }catch(error){
        console.log("Invalid generate AccessToken =>", error)
    }
};

const generateRefreshToken = (data:Record<string ,any>)=>{
    try{
       const token = jwt.sign({data},securityCode,{expiresIn:'7d'});
        return token
    }catch(error){  
        console.log("Invalid generate RefreshToken =>", error)
    }   
};

const verifyToken = (token:string)=>{
    try{
        const payload = jwt.verify(token , securityCode)as MyTokenPayload;
        return payload
    }catch(error){  
        console.log("Invalid Verify Token", error)
    }
};

const hashedPassword = async(password:string)=>{
    const hashPassword = await hash(password , 10);
    return hashPassword
};

const comparePassword = async(password:string, hashPassword:string)=>{
    const validPassword = await compare(password , hashPassword);
    return validPassword
}

export {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    hashedPassword,
    comparePassword
}

