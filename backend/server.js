const  express = require ('express');
const cors = require ('cors');
const bodyparser = require ('body-parser');
const router = require("./router");


const server =express();
const PORT =3004;
server.use(cors());

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({extended:false}));
server.use(router);


server.listen(PORT,(err)=>
{
    if(err)
    {
        console.log("err");
    }
    else
    {
        console.log(`server is runing ${PORT}`);

    }

});