import {createMenu , getAllMenu , getMenuById , updateMenu , deleteMenu} from '@/services/menu.services.js';
import { Reply, Req } from '@/types/fastify.js';
import { MenuCreateProps } from '@/types/menu.js';

export const createMenuController = async (req:Req , reply:Reply )=>{
    try{
        const {name , description , base_price , category_id , size , is_active} = req.body as MenuCreateProps;
        const menu = await createMenu({
            name,
            description,
            base_price,
            category_id,
            size,
            is_active,
        });

        reply.code(201).send({
            message:'محصول جدید در منو اضافه شد',
            statusCode:201,
            data:menu,
        });

    }catch(error:any){
        reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};

export const getMenuAllController = async(req:Req , reply:Reply)=>{
    try{
            const menu  = await getAllMenu();
    reply.code(200).send({
        message:'دریافت لیست تمام مصحولات',
        statusCode:200,
        data:menu
    });
    
    }catch(error:any){
        reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};

export const getMenuIdController = async (req:Req , reply:Reply)=>{
    try{
        const {id} = req.params as {id:string};
        if(!id){
            reply.code(400).send({
                message:'ایدی نامعتبر است',
                statusCode:400,
            })
        };

        const menu = await getMenuById(id);
        reply.code(200).send({
            message:"محصول مورد نظر یافت شد",
            statusCode:200,
            data:menu
        });
    }catch(error:any){
        reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};

export const updateMenuController = async (req:Req , reply:Reply)=>{
    try{
        const {id} = req.params as {id:string};
        if(!id){
            return reply.code(400).send({
                message:'ایدی نامعتبر است',
                statusCode:400,
            });
        };

        const updateData:Record<string , any> = {};
        const allowedFields = ['name' , 'description' , 'category_id', 'base_price','is_active','size'];
        for(const key of allowedFields){
            if((req as any).body !== undefined){
                updateData[key] = (req as any).body[key]
            }
        };

        const update = await updateMenu(id , updateData);
        return reply.code(200).send({
            message:'تغییرات شما موفقیت آمیز بود',
            statusCode:200,
            data:update,
        })

    }catch(error:any){
        reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};

export const deleteMenuController = async (req:Req , reply:Reply)=>{
    try{
        const {id} = req.params as {id:string};
        if(!id){
            return reply.code(400).send({
                message:'ایدی نامعتبر است',
                statusCode:400,
            });
        };

        const deleted = await deleteMenu(id);
        reply.code(203).send({
            message:'محصول مورد نظرشما حذف شد',
            statusCode:203,
            data:deleted
        })
    }catch(error:any){
        reply.code(400).send({
            message:error.message,
            statusCode:400,
        })        
    }
}

