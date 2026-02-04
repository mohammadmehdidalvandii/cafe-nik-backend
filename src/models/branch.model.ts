import sequelize from "@/config/db.js";
import { BranchProps } from "@/types/branch.js";
import { DataTypes, Model } from "sequelize";

type BranchInstance = Model<BranchProps> & BranchProps

export const Branch = sequelize.define<BranchInstance>('Branch',{
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
    users_id:{
        type:DataTypes.UUID,
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