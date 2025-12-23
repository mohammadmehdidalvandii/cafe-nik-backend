import fastify  from "fastify";
import sequelize from "./config/db.js";


const fast = fastify({logger:true});


fast.get('/', async(req , reply)=>(
    reply.send('hello world')
))

const start = async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Database connected ✅");
        await sequelize.sync({alter:true});
        console.log("✅ Models synced");
        await fast.listen({port:3000});
        console.log("Server running on port 3000")
    }catch(error:any){
        console.error(error);
        process.exit(1)
    }
};

start()