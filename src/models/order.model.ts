import sequelize from "@/config/db.js";
import { DataTypes } from "sequelize";

export const Order = sequelize.define('Order',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    branch_id:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    total_price:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    delivery_date:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    delivery_code:{
        type:DataTypes.TIME,
        allowNull:false,
    },
    pickup_code:{
        type:DataTypes.STRING(10),
        allowNull:false,
    },
    status:{
        type:DataTypes.ENUM(
            "در انتظار تایید",
            "تایید شد",
            "درحال آماده سازی",
            "آماده تحویل",
            "تحویل داد شد",
            "لغو شد",
        ),
        defaultValue:"در انتظار تایید"
    }
},{
    tableName:"orders",
    underscored:true
});