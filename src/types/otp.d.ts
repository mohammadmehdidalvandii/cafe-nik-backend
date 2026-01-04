export interface OtpAttributes{
    id?:string
    phone:string
    code:string
    expires_at:Date,
    used:boolean
}