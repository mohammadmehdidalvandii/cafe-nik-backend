import {Menu , CategoryProduct} from '@/models/index.js'
import { MenuCreateProps } from '@/types/menu.js'

export const createMenu = async({name , description , category_id , is_active , base_price, size}:MenuCreateProps)=>{
    const existMenu = await Menu.findOne({where:{name}});
    if(existMenu){
        throw new Error('این محصول در منو از قبل وجود دارد');
    };

    const newMenu = await Menu.create({
        name,
        description,
        category_id,
        is_active,
        base_price:base_price|| null,
        size:size || null,
    });

    return newMenu
};

export const getAllMenu = async ()=>{
    const menu = await Menu.findAll({include:[{
        model:CategoryProduct,
        as:'categoryProduct',
    }]});

    return menu;
};

export const getMenuById = async(id:string)=>{
    const menu = await Menu.findByPk(id,{include:[{
        model:CategoryProduct,
        as:'categoryProduct'
    }]});

    return menu;    
};

export const updateMenu = async (id:string , data:Partial<{name:string, description:string, category_id:string,is_active:boolean , base_price:string, size:object}>)=>{
    const menu = await Menu.findByPk(id,{include:[{
        model:CategoryProduct,
        as:'categoryProduct'
    }]});

    if(!menu) throw new Error('این محصول وجود ندارد');

    const allowedFields:(keyof MenuCreateProps)[] = [
        'name',
        'description',
        'category_id',
        'base_price',
        'is_active',
        'size',
    ];

    let update = {} as any;

    allowedFields.forEach((field)=>{
        if(data[field] !== undefined){
            update[field] = data[field]
        }
    });

    await menu.update(update);
    return menu;
};

export const deleteMenu = async (id:string)=>{
    const existMenu = await Menu.findByPk(id);
    if(!existMenu) throw new Error('این  محصول در منو وجود نداره');
    const deleted = await Menu.destroy({where:{id}});
    return deleted;
};