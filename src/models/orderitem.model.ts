import sequelize from "@/config/db.js";
import { OrderItemProps } from "@/types/orderItem.js";
import { DataTypes, Model } from "sequelize";

type orderItemInstance = Model<OrderItemProps> & OrderItemProps;

export const OrderItem = sequelize.define<orderItemInstance>('OrderItem',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
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