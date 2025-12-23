import {Sequelize} from 'sequelize';

const sequelize = new  Sequelize("cafeNike" , "root", "mohammadmehdi79@",{
    host:'localhost',
    port:3306,
    dialect:'mysql',
    logging:false,
    define:{
        freezeTableName:true,
        timestamps:true,
        paranoid:true,
        underscored:true,
    }
})

 export default sequelize;