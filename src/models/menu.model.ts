import sequelize from "@/config/db.js";
import { DataTypes } from "sequelize";

export const Menu = sequelize.define("Menu",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    category_id:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    is_active:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
    },
    base_price:{
        type:DataTypes.INTEGER,
    },
    size:{
        type:DataTypes.JSON,
    }
},{
    tableName:"menu",
    underscored:true,
});