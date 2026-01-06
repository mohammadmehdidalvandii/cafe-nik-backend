import {CategoryProduct} from '@/models/index.js';
 
export const createCategoryProduct = async(name:string)=>{
    const existCategoryProduct = await CategoryProduct.findOne({where:{name}});
    if(existCategoryProduct){
        throw new Error('این دستبندی محصول از قبل وجود داره')
    }
    const categoryProduct = await CategoryProduct.create({name});
    return categoryProduct
};

export const getAllCategoryProduct = async ()=>{
    const categoriesProduct = await CategoryProduct.findAll();
    return categoriesProduct;
};

export const getCategoryProduct = async (id:string)=>{
    const categoryProduct = await CategoryProduct.findByPk(id);
    if(!categoryProduct) throw new Error('دسته بندی وجود نداره');
    return categoryProduct;
}
