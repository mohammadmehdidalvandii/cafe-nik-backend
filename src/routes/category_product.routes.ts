import {createCategoryProductController , getAllCategoryController ,getCategoryById} from '@/controller/category_product.controller.js';
import { fast } from '@/types/fastify.js';

export default async function categoryProductRoutes(fastify:fast){
    fastify.post('/create', createCategoryProductController);
    fastify.get('/', getAllCategoryController);
    fastify.get('/:id', getCategoryById);
}