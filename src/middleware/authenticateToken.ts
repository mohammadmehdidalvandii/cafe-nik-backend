import { Reply, Req } from "@/types/fastify.js";
import { verifyToken } from "@/utils/auth.js";

export async function authenticateToken(req: Req, reply: Reply ) {
  const authHeader  = req.headers.authorization;
    console.log("auth", authHeader)
  if (!authHeader) {
    return reply.code(401).send({
      message: "Access denied. No token provided",
    });
  }
  const token = authHeader.split(' ')[1];
  if(!token){
    return reply.code(401).send({
        message:'Access denied.No token provided'
    })
};
console.log("token", token);
  try{
      const decoded = verifyToken(token);
      (req as any).user = decoded?.data

  }catch(error:any){
    return reply.code(403).send({
        message:'Invalid or expired token',
        statusCode:403
    })
  }
}
