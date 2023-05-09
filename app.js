const express=require('express');
const app=express();
const PORT=4444;

app.set('view engine', 'hbs');
app.use(express.urlencoded({extended:true}))
const path=require('path');
app.use(express.static(path.join(__dirname,'public')))
const List_route=require('./routes/list');
app.use('/',List_route);

  
app.listen(process.env.PORT || PORT,()=>{
    console.log('http://localhost:'+PORT+"/Tasks");
})


