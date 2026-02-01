import{ registerWithPassword , registerWithGuest , sendOTP ,verifyCode , loginWithPassword , refreshToken, getProfile, registerWithPhoneSendOTP, verifyPhoneOtp } from '@/services/auth.services.js';
import { LoginWithPassword, RegisterWithGuest, RegisterWithOTPProps, RegisterWithPasswordProps, VerifyCodeOtpProps } from '@/types/auth.js';
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
};

export const loginPasswordController = async (req:Req , reply:Reply)=>{
    try{
        const {email , password} = req.body as LoginWithPassword
        const {accessToken , refreshToken} = await loginWithPassword({email , password});
            if(!refreshToken){
                    throw new Error('Refresh Token not generate')                   
            }
             reply.cookie('refreshToken',refreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:'strict',
                path:'/',
                maxAge:60 * 60 * 24 * 7
             });

             reply.code(200).send({
                message:'ورود شما موفقیت آمیز بود',
                statusCode:200,
                data:{accessToken}
             })

    }catch(error:any){
        reply.code(401).send({
            message:error.message,
            statusCode:401
        })
    }
};

export const refreshTokenController = async (req: Req, reply: Reply) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return reply.code(401).send({
        message: 'Refresh token not found',
        statusCode: 401,
      });
    }

    const accessToken = await refreshToken(token);

    return reply.code(200).send({
      message: 'Access token refreshed successfully',
      statusCode: 200,
      data: { accessToken },
    });

  } catch (error: any) {
    return reply.code(401).send({
      message: error.message || 'Invalid refresh token',
      statusCode: 401,
    });
  }
};

export const profileController = async (req:Req ,reply:Reply)=>{
    try{
        const {id} = req.params as {id:string} ;
        if(!id){
            return reply.code(400).send({
                message:'ID is not exist',
                statusCode:400
            });
        };

        const profile = await getProfile(id);
        return reply.code(200).send({
            message:'Get profile successfully',
            statusCode:200,
            data:profile
        });
    }catch(error:any){
        return reply.code(400).send({
            message:error.message,
            statusCode:400
        })
    }
};

export const sendPhoneOtpController = async (req:Req , reply:Reply)=>{
    try{
    const {phone } = req.body as VerifyCodeOtpProps;
    const code  = await registerWithPhoneSendOTP(phone);
    return reply.code(200).send({
        message:'کد تایید ارسال شد',
        statusCode:200,
        data:code
    });
    }catch(error:any){
        return reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};

export const verifyPhoneOtpController = async (req:Req, reply:Reply)=>{
    try{
        const {phone , code} = req.body as {code:string, phone:string};
        const {accessToken , refreshToken} = await verifyPhoneOtp(phone , code);

            if(!refreshToken){
                    throw new Error('Refresh Token not generate')                   
            }
             reply.cookie('refreshToken',refreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:'strict',
                path:'/',
                maxAge:60 * 60 * 24 * 7
             });

        reply.code(201).send({
            message:'ثبت نام شما موفقیت آمیز بود',
            statusCode:201,
            data:[accessToken]
        })
    }catch(error:any){
       return reply.code(400).send({
        message:error.message,
        statusCode:400
       })
    }
}

export const logoutController = async (req:Req , reply:Reply)=>{
    reply.clearCookie('refreshToken');
    reply.code(200).send({
        message:'از حساب کاربری با موفقیت خارج شدید',
        statusCode:200,
    })
}