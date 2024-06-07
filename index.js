const Datastore = require('nedb');
const db = new Datastore('database');
db.loadDatabase();

const express = require('express');
const app = express();
app.listen(3000, () => console.log("listening to port 3000"));
app.use(express.static('public'));
app.use(express.json({ limit : '1mb' }));

app.post('/send', (req, res) => {
    body = req.body;
    db.insert(body);
    res.json({
        status: 'success',
    });
});

app.get('/recieve', (req, res) => {
    db.find({}, (err, data) => {
        if(err){
            console.error(err);
            res.end();
            return;
        }
        res.json(data)
    });
});