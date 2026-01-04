import{ registerWithPassword , registerWithGuest , sendOTP ,verifyCode , loginWithPassword  } from '@/services/auth.services.js';
import { RegisterWithGuest, RegisterWithOTPProps, RegisterWithPasswordProps, VerifyCodeOtpProps } from '@/types/auth.js';
import { Reply, Req } from '@/types/fastify.js';


export const registerPasswordController = async (req:Req , reply:Reply)=>{
    try{
        const {username , email , phone , password} = req.body as RegisterWithPasswordProps;
        const user = await registerWithPassword({
            username,
            email,
            phone,
            password    
        });

        reply.code(201).send({
            message:"حساب کاربری با موفقیت ایجاد شد ",
            data:user
        })

    }catch(error:any){
        reply.code(400).send({
            message:error.message,
            statusCode:400
        })
    }
};

export const registerGuessController = async (req:Req , reply:Reply )=>{
    try{
        const {username , phone} = req.body as RegisterWithGuest;
        const user = await registerWithGuest({
            username,
            phone
        });

        reply.code(201).send({
            message:'حساب کاربری ایجاد شد ',
            data:user
        })
    }catch(error:any){
        reply.code(401).send({
            message:error.message,
            statusCode:401
        })
    }
};

export const sendOtpController = async (req:Req , reply:Reply)=>{
    try{
        const {phone} = req.body as RegisterWithOTPProps;
        const code = await sendOTP({phone});


        reply.code(200).send({
            message:'کد تایید شما ارسال شد',
            statusCode:200,
            data:code
        })
    }catch(error:any){
        reply.code(401).send({
            message:error.message,
            statusCode:401
        })
    }
};

export const verifyOtpController = async (req:Req , reply:Reply)=>{
    try{
        const {phone , code} = req.body as VerifyCodeOtpProps;
            const {user , accessToken ,refreshToken} = await verifyCode({phone , code});
               if(!refreshToken){
                    throw new Error('Refresh Token not generate')                   
            }
            reply.cookie('refreshToken', refreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:'strict',
                path:'/',
                maxAge:60 * 60 * 24 * 7
            })
            
        reply.code(201).send({
            message:'ورود شما موفقیت امیز بود',
            statusCode:401,
            data: {accessToken , user}
        })
    }catch(error:any){
        reply.code(401).send({
            message:error.message
        })
    }
}