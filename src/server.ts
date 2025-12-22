const fastify  = require('fastify')({logger:true});
const sequelize = require('@/config/db');



fastify.get('/', async(req , reply)=>(
    reply.send('hello world')
))

const start = async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Database connected ✅");
        await sequelize.sync({alter:true});
        console.log("✅ Models synced");
        await fastify.listen({port:3000});
        console.log("Server running on port 3000")
    }catch(error:any){
        console.error(error);
        process.exit(1)
    }
};

start()