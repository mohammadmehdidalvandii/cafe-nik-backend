import {createMenuController , getMenuAllController , getMenuIdController , updateMenuController , deleteMenuController} from '@/controller/menu.controller.js';
import { fast } from '@/types/fastify.js';

export default async function menuRoutes(fastify:fast){
    fastify.post('/create', createMenuController);
    fastify.get('/', getMenuAllController);
    fastify.get('/:id', getMenuIdController);
    fastify.put('/update/:id', updateMenuController);
    fastify.delete('/delete/:id', deleteMenuController);
}