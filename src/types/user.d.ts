export type UserRole = 'مشتری'|'مدیر شعبه'|'مدیریت';
export type LoginMethod = 'password'|'OTP'|'guest'|'phone';

export interface UserAttributes{
    id?:string,
    username?:string,
    phone:string,
    email?:string|null,
    password?:string| undefined,
    roles:UserRole,
    login_method:LoginMethod,
    is_guest:boolean,
    created_at?:Date,
    updated_at?:Date,
}

export type UserCreationAttributes = Omit<
  UserAttributes,
  'id' | 'created_at' | 'updated_at'
>