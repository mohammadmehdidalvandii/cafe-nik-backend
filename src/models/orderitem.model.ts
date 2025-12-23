import sequelize from "@/config/db.js";
import { DataTypes } from "sequelize";

export const OrderItem = sequelize.define('OrderItem',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
    },
    order_id:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    menu_id:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    size:{
        type:DataTypes.STRING(20),
    },
    unit_price:{
        type:DataTypes.INTEGER,
        allowNull:false, 
    },
    quantity:{
        type:DataTypes.INTEGER,
        defaultValue:1,
        allowNull:false,
    },
    total_price:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
},{
    tableName:"order_items",
    underscored:true,
});