import sequelize from "@/config/db.js";
import { cityProps } from "@/types/city.js";
import { DataTypes, Model } from "sequelize";

type CityInstance = Model<cityProps> & cityProps

export const City = sequelize.define<CityInstance>('City',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
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