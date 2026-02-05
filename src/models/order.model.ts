import sequelize from "@/config/db.js";
import { OrderProps } from "@/types/order.js";
import { DataTypes, Model } from "sequelize";
import { Branch } from "./branch.model.js";

type orderInstance = Model<OrderProps> & OrderProps;

export const Order = sequelize.define<orderInstance>('Order',{
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
    delivery_time:{
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

Order.afterSave(async (order , options)=>{
    await Branch.increment(
        {orders_count:1, total_revenue:order.total_price},
        {where:{id:order.branch_id},
        transaction:options.transaction
    }
    )
})