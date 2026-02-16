import {createBranchController , getBranchIdController , getBranchesController , updateBranchController ,deleteBranchController, getBranchUserIdController, getBranchCityIdController} from '@/controller/branch.controller.js';
import {fast} from '@/types/fastify.js';

export default async function branchRoutes(fastify:fast) {
    fastify.post('/create', createBranchController);
    fastify.get('/', getBranchesController);
    fastify.get('/:id', getBranchIdController);
    fastify.get('/user/:id', getBranchUserIdController);
    fastify.get('/city/:id', getBranchCityIdController);
    fastify.put('/update/:id', updateBranchController);
    fastify.delete('/delete/:id', deleteBranchController);
}
