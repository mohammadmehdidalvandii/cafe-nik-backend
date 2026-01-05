import {createCityController , getAllCityController , getCityByIdController } from '@/controller/city.controller.js';
import { fast } from '@/types/fastify.js';
export default async function citiesRoutes(fastify:fast) {
    fastify.post('/create' , createCityController);
    fastify.get('/', getAllCityController);
    fastify.get('/:id', getCityByIdController);
};