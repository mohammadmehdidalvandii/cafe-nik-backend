import {registerPasswordController , registerGuessController , sendOtpController , verifyOtpController ,loginPasswordController,
refreshTokenController,
profileController,
logoutController,
verifyPhoneOtpController,
registerManagerBranchController,
getAllUserBranchManagerController,
} from '@/controller/auth.controller.js'
import { authenticateToken } from '@/middleware/authenticateToken.js';
import { fast } from '@/types/fastify.js'

export default async function authRoutes(fastify:fast){
    fastify.post('/register', registerPasswordController);
    fastify.post('/register-manager', registerManagerBranchController);
    fastify.post('/guest', registerGuessController);
    fastify.post('/sendCode', sendOtpController);
    fastify.post('/verify-code', verifyOtpController);
    fastify.post('/loginPassword', loginPasswordController);
    fastify.post('/refreshToken', refreshTokenController);
    fastify.post('/logout', logoutController);
    fastify.post('/registerPhone', sendOtpController);
    fastify.post('/register-code', verifyPhoneOtpController)
    fastify.get('/profile',{preHandler: authenticateToken} , profileController);
    fastify.get('/users-branch', {preHandler:authenticateToken} , getAllUserBranchManagerController);
}