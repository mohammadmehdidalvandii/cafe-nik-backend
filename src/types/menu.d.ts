export interface MenuProps{
    id?:string,
    name:string,
    description:string,
    category_id:string,
    is_active:boolean,
    base_price:string | null,
    size?:object | nul
}
export interface MenuCreateProps{
    name:string,
    description:string,
    category_id:string,
    is_active:boolean,
    base_price?:string | null,
    size?:object | nul
}