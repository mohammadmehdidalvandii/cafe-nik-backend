import {DataTypes, Model} from 'sequelize';
import sequelize from '@/config/db.js';
import { OtpAttributes } from '@/types/otp.js';

type otpInstance = Model<OtpAttributes> & OtpAttributes

export const Otp = sequelize.define<otpInstance>('Otp',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    phone:{
        type:DataTypes.STRING(11),
        allowNull:false,
    },
    code:{
        type:DataTypes.STRING(6),
        allowNull:false,
    },
    expires_at:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    used:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    }
},{
    tableName:"otps",
    underscored:true,
    timestamps:true,
});