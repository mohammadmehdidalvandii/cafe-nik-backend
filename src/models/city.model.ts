import sequelize from "@/config/db.js";
import { DataTypes } from "sequelize";


export const City = sequelize.define('City',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:false,
    }
},{
    tableName:"city",
    underscored:true,
})