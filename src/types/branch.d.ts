export interface BranchProps{
    id?:string,
    name:string,
    country:string,
    city_id:string,
    address:string,
    users_id:string,
    phone:string,
}

export interface CreateBranchProps{
    name:string,
    country:string,
    city_id:string,
    address:string,
    users_id:string,
    phone:string,
}