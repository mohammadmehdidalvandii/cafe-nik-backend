import {Branch, City, User} from '@/models/index.js';
import { CreateBranchProps, UpdateBranchProps } from '@/types/branch.js';

export const createBranch = async ({name , country , city_id , address , users_id , phone , orders_count , total_revenue}:CreateBranchProps)=>{
    const existManager = await Branch.findOne({
        where:{
            users_id
        }
    });

    if(existManager){
        throw new Error('به این مدیر قبلا یک شعبه اختصاص داده شده است.')
    }


    const branch = await Branch.create({
        name,
        country,
        city_id,
        address,
        users_id,
        phone,
        orders_count:orders_count ||0,
        total_revenue: total_revenue||0,
    });
     return branch
};

export const getAllBranches = async ()=>{
    const branches = await Branch.findAll({include:[{
        model:City,
        as:'city',
    },{
        model:User,
        as:'user',
        attributes:{
            exclude:['password']
        }
    }]});
    return branches
};

export const getBranchById = async (id:string)=>{
    const branch = await Branch.findByPk(id,);
    return branch
};


export const getBranchUserId = async (users_id:string)=>{
    const branch = await Branch.findOne({
        where:{users_id},
        include:[
            {model:City , as:'city'},
            {model:User, as:'user', attributes:{exclude:['password']}}
        ]
    });

    return branch
}

export const updateBranch = async (id:string, data:Partial<{name:string , country:string , city_id:string , address:string , users_id:string , phone:string}>)=>{
    const branch = await Branch.findByPk(id,{include:[{
        model:City,
        as:'city'
    }]});
    if(!branch) throw new Error('این شعبه موجود نیست ');

        const allowedFields:(keyof UpdateBranchProps)[] = [
        'name',
        'city_id',
        'country',
        'address',
        'users_id',
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