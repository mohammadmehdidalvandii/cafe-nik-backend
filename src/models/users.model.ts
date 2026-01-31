import sequelize from "@/config/db.js";
import { UserAttributes } from "@/types/user.js";
import { DataTypes, Model} from "sequelize";

type userInstance = Model<UserAttributes> & UserAttributes;

export  const User = sequelize.define<userInstance>("User",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    username:{
        type:DataTypes.STRING(50),
        defaultValue:"مشتری",
    },
    phone:{
        type:DataTypes.STRING(11),
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        unique:true
    },
    password:{
        type:DataTypes.STRING(255),
    },
    roles:{
        type:DataTypes.ENUM('مدیریت','مدیر شعبه','مشتری'),
        defaultValue:'مشتری',
    },
    login_method:{
        type:DataTypes.ENUM('password','OTP','guest','phone'),
        defaultValue:'password',
    },
    is_guest:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    },
},{
    tableName:"users",
    underscored:true,
});