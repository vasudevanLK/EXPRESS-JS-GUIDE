//cmd -> npm init to initia te your project ....package.json file 'main': server.js file name is used

const express = require('express');
const app = express();
const path = require('path');
const port = 3500;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

