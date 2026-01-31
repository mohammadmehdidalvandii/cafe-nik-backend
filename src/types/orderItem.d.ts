export interface OrderItemProps{
    id?:string
    order_id:string
    menu_id:string
    size:Array|null,
    unit_price:number
    quantity:number
    total_price:number
}[]