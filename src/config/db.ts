const {Sequelize} = require('sequelize');

const connectToDB = new  Sequelize("cate-nik" , "root", "mohammadmehdi79@",{
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


module.exports = connectToDB;