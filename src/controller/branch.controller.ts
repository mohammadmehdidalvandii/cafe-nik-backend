import {createBranch , getAllBranches , getBranchById , updateBranch , deleteBranch, getBranchUserId} from '@/services/branch.services.js';
import { Reply, Req } from '@/types/fastify.js';

export const createBranchController = async (req:Req , reply:Reply)=>{
    try{
        const {name , country ,  city_id , address , users_id , phone} = req.body as any;
        console.log("users_id", users_id)
        const branch = await createBranch({
            name , 
            city_id,
            country,
            address,
            users_id,
            phone
        });

        reply.code(201).send({
            message:"شعبه جدید ایجاد شد",
            statusCode:201,
            data:branch
        });

    }catch(error:any){
        reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};

export const getBranchesController = async (req:Req , reply:Reply)=>{
    try{
        const branches = await getAllBranches();
        reply.code(200).send({
            message:'لیست تمام  شعبات',
            statusCode:200,
            date:branches
        })
    }catch(error:any){
        reply.code(500).send({
            message:error.message,
            statusCode:500,
        })
    }
};

export const getBranchIdController = async (req:Req , reply:Reply)=>{
    try{
        const {id} = req.params as {id:string};
        if(!id){
            return reply.code(400).send({
                message:'چنین ایدی وجود نداره',
                statusCode:400,
            });
        };

        const branch = await getBranchById(id);
        reply.code(200).send({
            message:'شعبه مورد نظر یافت شد',
            statusCode:200,
            data:branch
        })
    }catch(error:any){
        return reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};

export const getBranchUserIdController = async (req:Req , reply:Reply)=>{
    try{
        const {id} = req.params as {id:string};
        if(!id){
            return reply.code(400).send({
                message:'چنین ایدی وجود نداره',
                statusCode:400,
            });
        };
        
        const branch = await getBranchUserId(id);
        reply.code(200).send({
            message:'شعبه مورد نظر یافت شد',
            statusCode:200,
            data:branch
        })
    }catch(error:any){
        reply.code(400).send({
            message:error.message,
            statusCode:400
        })
    }
}

export const updateBranchController = async (req:Req , reply:Reply)=>{
    try{
        const {id} = req.params as {id:string};
        if(!id){
            return reply.code(400).send({
                message:'ایدی نامعتبر است',
                statusCode:400,
            })
        };
        const updateData:Record<string , any> = {};
        const allowedFields = ['name', 'country', 'city_id', 'address', 'users_id', 'phone'];
        for(const key of allowedFields){
            if((req as any).body[key] !== undefined){
                updateData[key] = (req as any).body[key]
            }
        };

        const update = await updateBranch(id ,updateData);
        return reply.code(200).send({
            message:"آپدیت شما موفقیت آمیز بود ",
            statusCode:200,
            data:update,
        })
    }catch(error:any){
        return reply.code(400).send({
            message:error.message,
            statusCode:400
        })
    }
};

export const deleteBranchController = async (req:Req , reply:Reply)=>{
    try{
        const {id} = req.params as {id:string};
        if(!id){
            return reply.code(400).send({
                message:'ایدی نامعتبر است',
                statusCode:400,
            })
        };
        
        const deleted = await deleteBranch(id) ;
        return reply.code(203).send({
            message:'شعبه مورد نظر پاک شد',
            statusCode:203,
            data:deleted,
        })
    }catch(error:any){
        return reply.code(400).send({
            message:error.message,
            statusCode:400
        })   
    }
}