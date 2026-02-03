import fastify  from "fastify";
import sequelize from "./config/db.js";
import cookie from '@fastify/cookie'
import authRoutes from "./routes/auth.routes.js";
import citiesRoutes from "./routes/city.route.js";
import branchRoutes from "./routes/branch.routes.js";
import categoryProductRoutes from "./routes/category_product.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cors from '@fastify/cors'

const fast = fastify({logger:true});

fast.register(cookie);
fast.register(cors,{
    origin:'http://localhost:5173',
    credentials:true,
    methods:['DELETE','PUT','GET','POST']
})

// Routes 
fast.register(authRoutes ,{prefix:'/api/auth'});
fast.register(citiesRoutes, {prefix:'/api/city'});
fast.register(branchRoutes , {prefix:'/api/branch'});
fast.register(categoryProductRoutes , {prefix:'/api/category-product'});
fast.register(menuRoutes ,{prefix:'/api/menu'});
fast.register(orderRoutes , {prefix:'/api/order'})

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