import {Branch, City} from '@/models/index.js';
import { CreateBranchProps } from '@/types/branch.js';

export const createBranch = async ({name , country , city_id , address , manager_name , phone}:CreateBranchProps)=>{
    const branch = await Branch.create({
        name,
        country,
        city_id,
        address,
        manager_name,
        phone,
    });
     return branch
};

export const getAllBranches = async ()=>{
    const branches = await Branch.findAll({include:[{
        model:City,
        as:'city',
    }]});
    return branches
};

export const getBranchById = async (id:string)=>{
    const branch = await Branch.findByPk(id,);
    return branch
};

export const updateBranch = async (id:string, data:Partial<{name:string , country:string , city_id:string , address:string , manager_name:string , phone:string}>)=>{
    const branch = await Branch.findByPk(id,{include:[{
        model:City,
        as:'city'
    }]});
    if(!branch) throw new Error('این شعبه موجود نیست ');

        const allowedFields:(keyof CreateBranchProps)[] = [
        'name',
        'city_id',
        'country',
        'address',
        'manager_name',
        'phone',
    ];

    let update = {} as any;

    allowedFields.forEach((field)=>{
        if(data[field] !== undefined){
            update[field] = data[field]
        }
    })
    await branch.update(update);
    return branch
};

export const deleteBranch = async (id:string)=>{
    const branch = await Branch.findByPk(id);
    if(!branch) throw new Error('این شعبه وجود نداره');

    const deleted = await branch.destroy();
    return deleted
}