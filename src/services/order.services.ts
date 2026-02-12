import sequelize from '@/config/db.js';
import {Order , User , Branch, Menu, OrderItem} from '@/models/index.js';
import { OrderCreateProps, OrderUpdataProps } from '@/types/order.js';
import { OrderItemProps } from '@/types/orderItem.js';
import { sendOrderItems } from './sms.services.js';

const generatePickUpCode = ()=>{
    return Math.floor(100000 + Math.random() * 90000).toString();
};


export const createOrder = async ({user_id , branch_id  , delivery_time , delivery_date , status , items}:OrderCreateProps)=>{
    const transaction = await sequelize.transaction();
    try{
        let total_price = 0;
        const order = await Order.create({
            user_id,
            branch_id,
            total_price:0,
            delivery_date,
            delivery_time,
            pickup_code:generatePickUpCode(),
            status
        },{transaction});

        const orderItemsData:OrderItemProps[] = [];
        for(const item of items){
            const menu = await Menu.findByPk(item.menu_id ,{transaction});
            if(!menu)throw new Error('محصول یافت نشد');

  let unit_price;
      if (menu.size && item.size) {
        unit_price = menu.size[item.size];    
        if (!unit_price) throw new Error('سایز نامعتبر');
      } else {
        unit_price = menu.base_price;   
      }

            const itemTotal = unit_price * item.quantity;
            total_price += itemTotal;
            orderItemsData.push({
                order_id:order.id as string,
                menu_id:item.menu_id,
                size:item.size,
                unit_price,
                quantity:item.quantity,
                total_price:itemTotal,
            });
        }
            await OrderItem.bulkCreate(orderItemsData , {transaction});
            await order.update({total_price},{transaction});
            await transaction.commit();
            
            const user = await User.findByPk(order.user_id);
            if(user){
                await sendOrderItems(
                    user.phone,
                    user.username || 'کاربرمهان',
                    order.delivery_date,
                    order.delivery_time,
                    order.pickup_code,
                )
            }
            
            return order
    }catch(error:any){
        await transaction.rollback();
        throw new Error(error)
    }
};

export const getAllOrders = async ()=>{
    const orders = await Order.findAll({include:[
        { model:User , as:'user', attributes:{exclude:['password']}},
        {model:Branch, as:'branch'},
        {model:OrderItem , as:'order_items', include:[
            {model:Menu , as:'menu', attributes:['id', 'name']}
        ]}
    ],
    order:[['created_at','DESC']]
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

export const getOrderByUserId = async (id:string)=>{
    if(!id) throw new Error('شناسه کاربر ارسال نشده است');
    const orders = await Order.findAll({
        where:{user_id:id},
        include:[
            {model:User , as:'user'},
            {model:Branch ,  as: 'branch'},
            {model:OrderItem , as:'order_items',include:[{model:Menu , as:'menu'}]},
        ]
    });

    return orders
}

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

export const markOrderAsDelivered = async (pickupCode:string)=>{
    if(!pickupCode) throw new Error('کد تحویل خالی است')
    try{
        const order = await Order.findOne({where:{pickup_code:pickupCode}});
        if(!order) throw new Error('سفارش با کد تحویل پیدا نشد');

         order.status = 'تحویل داد شد';

         await order.save();
         return order
    }catch(error:any){
        throw new Error(error.message || error);
    }
}