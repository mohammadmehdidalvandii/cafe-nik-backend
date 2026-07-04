import {Sequelize} from 'sequelize';
import dotenv from "dotenv";
dotenv.config();


const sequelize = new  Sequelize(process.env.NAME_DB! , process.env.USER_DB!, process.env.PASSWORD_DB,{
    host:process.env.SERVER_DB,
    port:Number(process.env.PORT_DB),
    dialect:'mysql',
    logging:false,
    define:{
        freezeTableName:true,
        timestamps:true,
        paranoid:true,
        underscored:true,
    }
})

 export default sequelize;