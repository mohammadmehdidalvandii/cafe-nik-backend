import{ registerWithPassword , registerWithGuest , sendOTP ,verifyCode , loginWithPassword , refreshToken, getProfile, registerWithPhoneSendOTP, verifyPhoneOtp, registerManagerBranch, getAllUserBranchManager, getAllUsersCustomer, updateProfile, changePassword, } from '@/services/auth.services.js';
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



export const createBranchManagerController = async (req:Req , reply:Reply)=>{
    try{
        const {username , phone , email , password} = req.body as RegisterWithPasswordProps;
    
        const userRole = (req as any).user.roles;

        if(userRole !== 'مدیریت'){
            return reply.status(403).send({
                message:'شما دسترسی به این عملیات ندارید'
            })
        };

        const result = await registerManagerBranch({
            username,
            phone,
            email:email,
            password,
        });

        return reply.status(201).send(result);

    }catch(error:any){
        reply.code(401).send({
            message:error.message,
            statusCode:401
        })
    }
}

export const registerGuessController = async (req:Req , reply:Reply )=>{
    try{
        const {username , phone} = req.body as RegisterWithGuest;
        const {accessToken , refreshToken} = await registerWithGuest({
            username,
            phone
        });

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
            message:'حساب کاربری ایجاد شد ',
            data:accessToken
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
            const {accessToken ,refreshToken} = await verifyCode({phone , code});
            console.log("refresh token =>", refreshToken)
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
            statusCode:201,
            data: {accessToken}
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

        const user = (req as any).user

        const profile = await getProfile(user.id);
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

export const logoutController = async (_req:Req , reply:Reply)=>{
    reply.clearCookie('refreshToken');
    reply.code(200).send({
        message:'از حساب کاربری با موفقیت خارج شدید',
        statusCode:200,
    })
};


export const getAllUserBranchManagerController = async (_req:Req , reply:Reply)=>{
    try{
          const manager = await getAllUserBranchManager();
        console.log("manager" , manager)
        return reply.code(200).send({
            message:"لیست تمام مدیر شعبه ها دریافت شد",
            statusCode:200,
            data:manager
        })
    }catch(error:any){
        return reply.code(401).send({
            message:error.message,
            statusCode:401
        })
    }
};

export const getAllUsersCustomersController = async (_req:Req , reply:Reply)=>{
    try{
        const customers = await getAllUsersCustomer();
        return reply.code(200).send({
            message:"لیست مشتریان دریافت شد",
            statusCode:200,
            data:customers
        })
    }catch(error:any){
        return reply.code(401).send({
            message:error.message,
            statusCode:401
        })
    }
}

export const updateProfileController = async (req:Req , reply:Reply)=>{
    try{
        const {id} = req.params as {id:string};
        const {email , password , username} = req.body as {email:string , password:string , username:string}

        const result = await updateProfile(id, {email , password ,  username});

        return reply.code(200).send({
            message:'اپدیت موفیت آمیز بود',
            statusCode:200,
            data:result,
        });

    }catch(error:any){
        return reply.status(400).send({
            message:error.message,
            statusCode:400,
        })
    }
}

export const changePasswordController = async(req:Req , reply:Reply)=>{
    try{
        const {id} =  req.params as {id:string}
        const {currentPassword , newPassword} = req.body as {currentPassword:string , newPassword:string};

        if(!currentPassword || !newPassword){
            return reply.code(400).send({
                message:'رمز فعلی و رمز جدید الزامی است'
            })
        };

        const result = await changePassword(id , currentPassword , newPassword);
        return reply.code(200).send({
            message:'رمز عبور با موفقیت تغییر کرد',
            statusCode:200,
            data:result
        })
    }catch(error:any){
    return reply.status(400).send({
      message: error.message,
    });
    }
}