const { INTEGER, STRING } = require('sequelize');
const {Dbconn } = require('./database');
const Tasks =Dbconn.define('tasks',{
id:{
    type: INTEGER,
    primaryKey:true,
    autoIncrement: true,
    
},
content:{
    type:STRING,
    allowNull:false,
},
},{ timestamps: false, freezeTableName: false });

module.exports = {Tasks }
//Shalin Kulthe
