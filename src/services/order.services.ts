import {Order , User , Branch} from '@/models/index.js';
import { OrderCreateProps, OrderUpdataProps } from '@/types/order.js';

const generatePickUpCode = ()=>{
    return Math.floor(100000 + Math.random() * 90000).toString();
};


export const createOrder = async ({user_id , branch_id ,  total_price , delivery_time , delivery_date , status}:OrderCreateProps)=>{
    const order = await Order.create({
        user_id,
        branch_id,
        total_price,
        delivery_time,
        pickup_code:generatePickUpCode(),
        delivery_date:delivery_date ?? new Date().toISOString().split('T')[0],
        status
    });

    return order
};

export const getAllOrders = async ()=>{
    const orders = await Order.findAll({include:[
        { model:User , as:'user', attributes:{exclude:['password']}},
        {model:Branch, as:'branch'},
    ]
    })

    return orders
};

export const getOrderById = async (id:string)=>{
  const order = await Order.findByPk(id,{include:[
        { model:User , as:'user', attributes:{exclude:['password']}},
        {model:Branch , as: 'branch'},
    ]
    });
  if (!order) throw new Error('سفارش یافت نشد');
  return order;   
};

export const updateOrder = async (id:string , data:Partial<{status:'در انتظار تایید'|'تایید شد'|'درحال آماده سازی'|'آماده تحویل'|'تحویل داد شد'|'لغو شد'}>)=>{
    const order = await Order.findByPk(id);
    if(!order) throw new Error('سفارش یافت نشد');

    await order.update({status:data.status});

    return order;
};

export const deleteOrder = async (id:string)=>{
    const order = await Order.findByPk(id);
    if(!order) throw new Error('سفارش یافت نشد');

    const deleted = await order.destroy();
    return deleted
}
