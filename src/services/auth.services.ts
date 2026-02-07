import {User} from '@/models/index.js';
import { Otp } from '@/models/Otp.model.js';
import { Op } from 'sequelize';
import { comparePassword, generateAccessToken, generateRefreshToken, hashedPassword, verifyToken } from '@/utils/auth.js';
import { LoginWithPassword, RegisterWithGuest, RegisterWithOTPProps, RegisterWithPasswordProps, VerifyCodeOtpProps } from '@/types/auth.js';
import { sendOTPSms } from './sms.services.js';

// Register by Password
export const registerWithPassword = async ({username , phone , email , password}:RegisterWithPasswordProps)=>{
    const exitsUser = await User.findOne({
        where:{
            [Op.or]:[
                {phone},
                {email}
            ]
        }
    });
    if(exitsUser){
        throw new Error('کاربر از قبل وجود دارد')
    };

  const isFirstUser = (await User.count()) === 0;
  const roles = isFirstUser ? 'مدیریت' : 'مشتری';

    const hashPassword = await hashedPassword(password);

    const register = await User.create({
        username,
        phone,
        email,
        roles:roles,
        password:hashPassword,
        login_method:'password',
        is_guest:false
    });

    return register
};

// Register Manager Branch
export const registerManagerBranch = async ({username , phone , email , password}:RegisterWithPasswordProps)=>{
    const exitsUser = await User.findOne({
        where:{[Op.or]:[{email} , {phone}]}
    });
    if(exitsUser){
        throw new Error('کاربر از قبل ثبت نام کرد')
    };
    const nonGuestCount = await User.count({where:{is_guest:false}});
    const roles = nonGuestCount === 0 ? 'مدیریت' : 'مدیر شعبه';

    const hashPassword = await hashedPassword(password);

    const newUser = await User.create({
        username,
        phone,
        email,
        roles:roles,
        password:hashPassword,
        login_method:'password',
        is_guest:false
    });

    return newUser
}


// Register by OTP
export const sendOTP = async ({phone}:RegisterWithOTPProps)=>{
    let user = await User.findOne({where:{phone}});
    if(!user){
          const isFirstUser = (await User.count()) ;
         const roles = isFirstUser === 0 ? 'مدیریت' : 'مشتری';
        user = await User.create({
            phone,
            roles:roles,
            login_method:'OTP',
            is_guest:true
        })
    };

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now()+ 2 * 60 * 1000); // 2 min

     await Otp.create({
        phone,
        code,
        expires_at,
        used:false
    });
    // Send service message;
    await sendOTPSms(phone , code)

    return {message:"کد یکبار مصرف ارسال شد"}
};

// Verify Code

export const verifyCode = async({phone , code}:VerifyCodeOtpProps)=>{
    const otp = await Otp.findOne({
        where:{phone , code , used:false , expires_at:{[Op.gt]: new Date()}},
        order:[['created_at','DESC']]
    });

    if(!otp)throw new Error('کد ورود شما نامعتبر یا منقضی شد ');

    otp.used = true
    await otp.save();
    const user = await User.findOne({where:{phone}});

        const accessToken  = generateAccessToken({
        id:user?.id,
        username:user?.username,
        phone:user?.phone,
        roles:user?.roles,
        email:user?.email,
    });
    const refreshToken = generateRefreshToken({
        id:user?.id
    });
    
    return {user , accessToken , refreshToken}
}

// Register Guest
export const registerWithGuest = async({username , phone}:RegisterWithGuest)=>{
       const exitsUser = await User.findOne({where:{phone}});
    if(exitsUser){
        throw new Error('کاربر از قبل وجود دارد')
    }; 


  const isFirstUser = (await User.count()) ;
  const roles = isFirstUser === 0 ? 'مدیریت' : 'مشتری';

    const register = await User.create({
        username,
        phone,
        roles:roles,
        login_method:'guest',
        is_guest:true,
    });
    return register
};


// RegisterWithPhoneOTP
export const registerWithPhoneSendOTP = async (phone:string)=>{
    let user = await User.findOne({where:{phone}});
    if(user){
        const isFirstUser = (await User.count()) ;
  const roles = isFirstUser === 0 ? 'مدیریت' : 'مشتری';

        user = await User.create({
            phone,
            roles:roles,
            login_method:'phone',
            is_guest:true
        })
    };

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 2 * 60 *1000);

    await Otp.create({
        phone,
        code,
        expires_at,
        used:false
    });

    await sendOTPSms(phone , code);
    return {message:'کد تایید ارسال شد'}
}

export const verifyPhoneOtp = async (phone:string , code:string)=>{
    const otp = await Otp.findOne({
        where:{
            phone,
            code,
            used:false,
            expires_at: { [Op.gt]: new Date() },
        }
    });

    if(!otp){
        throw new Error('کد تایید نامعتبر یا منقضی شده است')
    };

    otp.used = true,
    await otp.save();

    const user = await User.findOne({where:{phone}});
    if(!user) throw new Error('کاربر یافت نشد')


        const accessToken  = generateAccessToken({
        id:user.id,
        username:user.username,
        phone:user.phone,
        roles:user.roles,
        email:user.email,
    });
    const refreshToken = generateRefreshToken({
        id:user.id
    });

    return {accessToken , refreshToken}
}

export const loginWithPassword = async({email , password}:LoginWithPassword)=>{
    const account = await User.findOne({where:{email}});
    if(!account){
        throw new Error('کاربر وجود ندارد')
    };
    if(!account.password){
        throw new Error('این کاربر با رمز عبور ثبت نام نکرده است ')
    }
    const isValid = await comparePassword(password , account.password);
    if(!isValid){
        throw new Error('ایمیل یا رمز عبور اشتباه است !');
    };

    const accessToken  = generateAccessToken({
        id:account.id,
        username:account.username,
        phone:account.phone,
        roles:account.roles,
        email:account.email,
    });
    const refreshToken = generateRefreshToken({
        id:account.id
    });

    return {accessToken , refreshToken}
};


export const refreshToken = async (refreshToken:string)=>{
    try{
        const payload:any = verifyToken(refreshToken);
        const newAccessToken = generateAccessToken({id:payload.id});
        return newAccessToken
    }catch(error:any){
        throw new Error(`Invalid RefreshToken => ${error.message}`)
    }
}

export const getProfile = async (id:string)=>{
    const profile = await User.findOne({
        where:{id},
        attributes:{
            exclude:['password']
        }
    });

    return profile
}

export const getAllUserBranchManager = async ()=>{
    const manager = await User.findAll({
        where:{roles:'مدیر شعبه', is_guest:false},
        attributes:{exclude:['password']}
    });

    return manager
};

export const getAllUsersCustomer = async ()=>{
    const customers = await User.findAll({
        attributes:{exclude:['password']}
    });

    return customers
}