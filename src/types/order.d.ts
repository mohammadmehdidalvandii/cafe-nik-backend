export interface OrderProps{
    id?:string,
    user_id:string,
    branch_id:string,
    total_price:string,
    delivery_date:date,
    delivery_time:string,
    pickup_code:string,
    status: 'در انتظار تایید'|'تایید شد'|'درحال آماده سازی'|'آماده تحویل'|'تحویل داد شد'|'لغو شد',
};

export interface OrderCreateProps {
    user_id:string,
    branch_id:string,
    total_price:string,
    delivery_date:date,
    delivery_time:date,
    pickup_code:string,
    status: 'در انتظار تایید'|'تایید شد'|'درحال آماده سازی'|'آماده تحویل'|'تحویل داد شد'|'لغو شد',
}

export interface OrderUpdataProps{
       status:'در انتظار تایید'|'تایید شد'|'درحال آماده سازی'|'آماده تحویل'|'تحویل داد شد'|'لغو شد',
}