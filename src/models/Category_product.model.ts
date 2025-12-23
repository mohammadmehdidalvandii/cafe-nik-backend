import sequelize from "@/config/db.js";
import { DataTypes } from "sequelize";

export const CategoryProduct = sequelize.define('CategoryProduct',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
},{
    tableName:'category_products',
    underscored:true,
});