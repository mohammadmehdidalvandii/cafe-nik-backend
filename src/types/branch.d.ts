export interface BranchProps{
    id?:string,
    name:string,
    country:string,
    city_id:string,
    address:string,
    users_id:string,
    phone:string,
    orders_count:number
    total_revenue:number
}

export interface CreateBranchProps{
    name:string,
    country:string,
    city_id:string,
    address:string,
    users_id:string,
    phone:string,
    orders_count?:number
    total_revenue?:number
}
export interface UpdateBranchProps{
    name:string,
    country:string,
    city_id:string,
    address:string,
    users_id:string,
    phone:string,
}