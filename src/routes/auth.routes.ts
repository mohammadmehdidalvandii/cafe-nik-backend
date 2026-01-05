import {registerPasswordController , registerGuessController , sendOtpController , verifyOtpController ,loginPasswordController,
refreshTokenController,
profileController,
} from '@/controller/auth.controller.js'
import { authenticateToken } from '@/middleware/authenticateToken.js';
import { fast } from '@/types/fastify.js'

export default async function authRoutes(fastify:fast){
    fastify.post('/register', registerPasswordController);
    fastify.post('/guest', registerGuessController);
    fastify.post('/sendCode', sendOtpController);
    fastify.post('/verify-code', verifyOtpController);
    fastify.post('/loginPassword', loginPasswordController);
    fastify.post('/refreshToken', refreshTokenController);
    fastify.get('/profile/:id',{preHandler: authenticateToken} , profileController)
}