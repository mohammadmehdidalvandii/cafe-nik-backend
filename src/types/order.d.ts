export interface OrderProps{
    id?:string,
    user_id:string,
    branch_id:string,
    total_price:number,
    delivery_date:date,
    delivery_time:string,
    pickup_code:string,
    status: 'در انتظار تایید'|'تایید شد'|'درحال آماده سازی'|'آماده تحویل'|'تحویل داد شد'|'لغو شد',
};

export interface OrderItemInput {
  menu_id: string;
  size: string;
  quantity: number;
}

export interface OrderCreateProps {
    user_id:string,
    branch_id:string,
    total_price:number,
    menu_id:string
    delivery_date:date,
    delivery_time:date,
    pickup_code:string,
    status: 'در انتظار تایید'|'تایید شد'|'درحال آماده سازی'|'آماده تحویل'|'تحویل داد شد'|'لغو شد',
    items:OrderItemInput[]
}

export interface OrderUpdataProps{
       status:'در انتظار تایید'|'تایید شد'|'درحال آماده سازی'|'آماده تحویل'|'تحویل داد شد'|'لغو شد',
}