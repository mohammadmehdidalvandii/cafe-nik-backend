export interface RegisterWithPasswordProps{
    username:string
    phone:string
    email:string
    password:string
};

export interface RegisterWithOTPProps{
    phone:string
};

export interface RegisterWithGuest{
    username:string
    phone:string 
};

export interface LoginWithPassword{
    email:string,
    password:string,
}
