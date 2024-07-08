const sequelize  = require("sequelize");
const  Dbconn= new sequelize("tododb","root","shalini",{
    
        host:"127.0.0.1",
        port:3306,
        dialect:"mysql"
    
});

module.exports={Dbconn};