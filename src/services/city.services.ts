import {City} from '@/models/index.js';

export const createCity = async (name:string)=>{
    const existCity = await City.findOne({where:{name}});
    if(existCity){
        throw new Error('این شهر از قبل وجود دارد')
    }
    const city = await City.create({name});
    return city;
};

export const getAllCities = async ()=>{
    const cities = await City.findAll({});
    return cities
};

export const getCityById = async (id:string)=>{
    const city = await City.findByPk(id);
    if(!city) throw new Error('شهر یافت نشد');
    return city;
};



