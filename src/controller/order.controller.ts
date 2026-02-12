import {createOrder , getAllOrders ,getOrderById ,deleteOrder ,updateOrder, markOrderAsDelivered, getOrderByUserId} from '@/services/order.services.js';
import { Reply, Req } from '@/types/fastify.js';
import { OrderCreateProps, OrderUpdataProps } from '@/types/order.js';

export const createOrderController = async (req:Req , reply:Reply)=>{
    try{
        const data = req.body as any ;  
        const order = await createOrder(data)

        reply.code(201).send({
            message:'سفارش شما ثبت شد',
            statusCode:201,
            data:order
        });

    }catch(error:any){
        return reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};

export const getAllOrderController = async (req:Req , reply:Reply)=>{
    try{
        const orders = await getAllOrders();
        if(!orders){
            return reply.code(400).send({
                message:'لیست سفارشات دریافت نشد',
                statusCode:400,
            });
        };
        reply.code(200).send({
            message:'لیست سفارشات دریافت شد',
            statusCode:200,
            data:orders
        });
    }catch(error:any){
        return reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};

export const getOrderByIdController = async (req:Req , reply:Reply)=>{
    try{
        const {id} = req.params as {id:string};
        if(!id){
            reply.code(400).send({
                message:'ایدی نامعتبر است',
                statusCode:400,
            });
        };

        const order = await getOrderById(id);

        reply.code(200).send({
            message:'سفارش شما دریفات شد',
            statusCode:200,
            data:order
        });

    }catch(error:any){
        return reply.code(400).send({
            message:error.message,
            statusCode:400,
        })       
    }
};

export  const getOrderUserController = async (req:Req , reply:Reply)=>{
    try{
        const {user_id} = req.params as {user_id:string};
        console.log("user -<" , user_id)
        const orders = await getOrderByUserId(user_id);
        return reply.code(200).send({
            statusCode:200,
            data:orders
        });
    }catch(error:any){
        return reply.code(400).send({
            statusCode:400,
            message:error.message
        })
    }
}

export const updateOrderController = async (req:Req , reply:Reply)=>{
    try{
        const {id} = req.params as {id:string};
        if(!id){
            reply.code(400).send({
                message:'ایدی نامعتبر است',
                statusCode:400,
            });
        };

        const {status} = req.body as OrderUpdataProps

        const updated = await updateOrder(id,{status});

        reply.code(200).send({
            message:'تغیرات سفارش انجام شد',
            statusCode:200,
            data:updated
        })
    }catch(error:any){
        reply.code(400).send({
            message:error.message,
            statusCode:400
        })
    }
};


export const deleteOrderController = async (req:Req , reply:Reply)=>{
    try{
        const {id} = req.params as {id:string};
        const deleted = await deleteOrder(id);
        reply.code(203).send({
            message:"سفارش با موفقیت حذف شد",
            statusCode:203,
            data:deleted,
        })
    }catch(error:any){
        reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};

export const deliveredOrderController = async (req:Req , reply:Reply)=>{
    try{
        const {pickup_code} = req.body as {pickup_code:string};
        console.log("pc", pickup_code)
        const order = await markOrderAsDelivered(pickup_code);
        return reply.code(200).send({
            message:'سفارش تحویل داد شد',
            statusCode:200,
            data:order,
        })
    }catch(error:any){
        return reply.code(400).send({
            message:error.message,
            statusCode:400
        })
    }
}
