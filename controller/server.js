const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/adduser', (req, res) => {
    const { username, dob, profession, userid } = req.body;
    const newuser = {
        'name': username,
        'dob': dob,
        'profession': profession
    };

    fs.readFile("user.json", "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        let userData = {};
        if (data) {
            userData = JSON.parse(data);
        }

        userData[userid] = newuser;
        const updateserver = JSON.stringify(userData);

        fs.writeFile("user.json", updateserver, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json(userData);
        });
    });
});


app.get('/single',(req,res)=>{

    res.sendFile(path.join(__dirname,'views','individual_user.html'))

    app.post('/induser', (req, res) => {
        fs.readFile('user.json', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
    
            var users = JSON.parse(data);
            var user = users[req.body.userid];
            res.json(user);
        });
    });
})

app.get('/delete',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','delete.html'))


    app.post('/deleteuser',(req,res)=>{
        fs.readFile('user.json','utf-8',(err,data)=>{
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
    
            data = JSON.parse(data);
            delete data[req.body.userid];
            var updateuser = JSON.stringify(data)
            fs.writeFile('user.json',updateuser,(err)=>{
                res.end(JSON.stringify(data))
            })
    
        });
    })
    
})

app.get('/showall', (req, res) => {
    fs.readFile('user.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        console.log(data);
        res.end(data);
    });
});

app.listen(8081, () => {
    console.log('Server is running at 8081');
});
