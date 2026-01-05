import {createCity , getAllCities , getCityById ,getCityByName} from '@/services/city.services.js';
import { Reply, Req } from '@/types/fastify.js';

export const createCityController = async (req:Req , reply:Reply)=>{
    try{
        const {name} = req.body as {name:string}
        const city = await createCity(name);

        reply.code(201).send({
            message:'Created new City',
            statusCode:201,
            data:city,
        })

    }catch(error:any){
        reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};

export const getAllCityController = async (req:Req , reply:Reply)=>{
    try{
        const cities = await getAllCities();
        reply.code(200).send({
            message:'get all cities',
            statusCode:200,
            data:cities
        });
    }catch(error:any){
        reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};

export const getCityByIdController = async (req:Req , reply:Reply)=>{
    try{
        const {id} = req.params as {id:string};
        if(!id){
            reply.code(400).send({
                message:'Id is required',
                statusCode:400
            })
        }
        const city = await getCityById(id);
        reply.code(200).send({
            message:'Get city by Id',
            statusCode:200,
            data:city,
        })
    }catch(error:any){
        reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};
export const getCityByNameController = async (req:Req , reply:Reply)=>{
    try{
        const {name} = req.params as {name:string};
        if(!name){
            reply.code(400).send({
                message:'Id is required',
                statusCode:400
            })
        }
        const city = await getCityById(name);
        reply.code(200).send({
            message:'Get city by Id',
            statusCode:200,
            data:city,
        })
    }catch(error:any){
        reply.code(400).send({
            message:error.message,
            statusCode:400,
        })
    }
};