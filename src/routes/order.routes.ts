import {createOrderController , getAllOrderController , getOrderByIdController , updateOrderController ,deleteOrderController} from '@/controller/order.controller.js';
import { fast } from '@/types/fastify.js';

export default async function orderRoutes(fastify:fast){
    fastify.post('/create', createOrderController);
    fastify.get('/' , getAllOrderController);
    fastify.get('/:id', getOrderByIdController);
    fastify.put('/update/:id', updateOrderController);
    fastify.delete('/delete/:id', deleteOrderController);
}