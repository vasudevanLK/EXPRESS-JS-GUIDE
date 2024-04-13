//cmd -> npm init to initia te your project ....package.json file 'main': server.js file name is changed

const express = require('express');
const app = express();
const path = require('path');
const port = 3500;

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

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));  //  /* anything except our files path
});
















app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

//nodemon for instant reload for server ith updates ->npm run dev

