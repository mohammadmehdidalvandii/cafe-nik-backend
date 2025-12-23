import sequelize from "@/config/db.js";
import { DataTypes } from "sequelize";

export const Branch = sequelize.define('Branch',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    country:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    city_id:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    address:{
        type:DataTypes.STRING(200),
        allowNull:false,
    },
    manager_name:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    phone:{
        type:DataTypes.STRING(11),
        allowNull:false,
    }
},{
    tableName:"branches",
    underscored:true,
})