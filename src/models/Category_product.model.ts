import sequelize from "@/config/db.js";
import { categoryProductProps } from "@/types/categoryProduct.js";
import { DataTypes, Model } from "sequelize";

type categoryProductInstance = Model<categoryProductProps> & categoryProductProps

export const CategoryProduct = sequelize.define<categoryProductInstance>('CategoryProduct',{
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