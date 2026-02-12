import {createOrderController , getAllOrderController , getOrderByIdController , updateOrderController ,deleteOrderController, deliveredOrderController, getOrderUserController} from '@/controller/order.controller.js';
import { fast } from '@/types/fastify.js';

export default async function orderRoutes(fastify:fast){
    fastify.post('/create', createOrderController);
    fastify.post('/deliver', deliveredOrderController);
    fastify.get('/' , getAllOrderController);
    fastify.get('/:id', getOrderByIdController);
    fastify.get('/user/:id',getOrderUserController);
    fastify.put('/update/:id', updateOrderController);
    fastify.delete('/delete/:id', deleteOrderController);
}