//cmd -> npm init to initia te your project ....package.json file 'main': server.js file name is changed

const express = require('express');
const app = express();
const logger= require('./middlewares/logevent');
const path = require('path');
const cors=require('cors')
const port = 3500;
    //middle wares
    // builtin middleware, custom, thirdparty
    // btwn frm rquest to response cycle
app.use(express.urlencoded({extended:false}))  //forms handling datas taken frm URL
app.use(express.json()) //data to backend frm client 
app.use(express.static(path.join(__dirname,'./public')))

//custom middleWares
app.use(logger)



app.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,'views','index.html'));  //__dir is the current folder specifies
});

//REGULAR EXPRESSION
// ^... $ what ever comes between this will rendered and also  next to that also can be used in path
//(...)?  ->either or

app.get('/newpage(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,'views','newpage.html'));  //__dir is the current folder specifies
});

app.get('/offer(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,'views','offer.html'));  //__dir is the current folder specifies
});

app.get('/discount(.html)?', (req, res) => {
    res.redirect(301,'offer.html');  //__dir is the current folder specifies
});
app.get('/rooms',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','homepage.html'))
})





app.get('/hello(.html)?',(req,res,next)=>{
    console.log('1. Trying to load hello.html')
    next()
},(req,res)=>{
    res.send('2. Rendering in web browser ')} )     //


//chaining with  next function   
 const one=(req,res,next)=>{
    console.log('one');
    next()
 }  
 const two =(req,res,next)=>{
    console.log('two')
    next()
 } 

 const three =(req,res,next)=>{
    console.log('three')
    res.send('third function rendering')
 } 
 app.get('/chaining',[one ,two ,three])


app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));  //  /* anything except our files path
});















app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

//nodemon for instant reload for server ith updates ->npm run dev

