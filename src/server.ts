import fastify  from "fastify";
import sequelize from "./config/db.js";
import cookie from '@fastify/cookie'
import authRoutes from "./routes/auth.routes.js";
import citiesRoutes from "./routes/city.route.js";

const fast = fastify({logger:true});

fast.register(cookie);

// Routes 
 fast.register(authRoutes ,{prefix:'/api/auth'});
 fast.register(citiesRoutes, {prefix:'/api/city'});


const start = async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Database connected ✅");
        await sequelize.sync();
        console.log("✅ Models synced");
        await fast.listen({port:3000});
        console.log("Server running on port 3000")
    }catch(error:any){
        console.error(error);
        process.exit(1)
    }
};

start()