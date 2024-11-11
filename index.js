var express= require('express');
var mongoose= require('mongoose');
const cors = require('cors');
const Router = require('./routes/custRoute');
const { Query } = require('./models/queryschema');
var app=express();
const port=6000;
// middleware
app.use(express.json());
app.use(cors());
app.use((req,res,next)=>{
    if(req.originalUrl=='/favicon.ico')
    {
        res.end();
    }
    next();
})
// connection
mongoose.connect('mongodb://127.0.0.1:27017/custumer')
.then(()=>console.log("Connection Done 👍"))
.catch(err=>console.log("error 😒",err));
app.use(Router);
app.listen(port,()=>console.log(`your server is running at port no ${port}`));module.exports = Query;

