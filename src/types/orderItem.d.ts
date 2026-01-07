export interface OrderItemProps{
    id?:string
    order_id:number
    menu_id:number
    size:object|null,
    unit_price:number
    quantity:number
    total_price:number
}