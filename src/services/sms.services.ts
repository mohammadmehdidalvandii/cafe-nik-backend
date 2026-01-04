import axios  from 'axios';

export const sendOTPSms = async(phone:string , code:string)=>{
    await axios.post(
        'https://api.sms.ir/v1/send/verify',
        {
            mobile:phone,
            templateId:907961,
            parameters:[{name:'CODE' ,value:code}]
        },
        {
            headers:{
                'X-API-KEY':'JqUvL1IamS5wY1MALkWDPy80XVjm5ZaBga1h1gXBV0n5LUhw',
                'Content-Type':'application/json'
            }
        }
    )
}