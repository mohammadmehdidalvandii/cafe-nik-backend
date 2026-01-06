import {createCategoryProduct , getCategoryProduct , getAllCategoryProduct} from '@/services/category_product.services.js';
import { Reply, Req } from '@/types/fastify.js';

export const createCategoryProductController = async (req:Req , reply:Reply)=>{
    try{
        const {name} = req.body as {name:string};
        
        const categoryProduct = await createCategoryProduct(name);
        reply.code(201).send({
            message:'دسته بندی جدید ایجاد شد',
            statusCode:201,
            data:categoryProduct,
        })
    }catch(error:any){
        return reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};

export const getAllCategoryController = async (req:Req, reply:Reply)=>{
    try{
        const categoriesProduct = await getAllCategoryProduct();
        reply.code(200).send({
            message:'لبست دسته بندی محصولات',
            statusCode:200,
            data:categoriesProduct,
        })
    }catch(error:any){
        return reply.code(400).send({
            message:error.message,
            statusCode:400
        })
    }
};

export const getCategoryById = async (req:Req , reply:Reply)=>{
    try{
        const {id} = req.params as {id:string};
        if(!id){
            return reply.code(400).send({
                message:"ایدی نامعتبر است",
                statusCode:400
            });
        }
        
        const categoryProduct = await getCategoryProduct(id);
        reply.code(200).send({
            message:'دستبندی مورد نظر شما یافت شد',
            statusCode:200,
            data:categoryProduct
        })
    }catch(error:any){
        return reply.code(400).send({
            message:error.message,
            statusCode:400
        })
    }
}