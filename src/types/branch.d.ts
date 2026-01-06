export interface BranchProps{
    id?:string,
    name:string,
    country:string,
    city_id:string,
    address:string,
    manager_name:string,
    phone:string,
}

export interface CreateBranchProps{
    name:string,
    country:string,
    city_id:string,
    address:string,
    manager_name:string,
    phone:string,
}