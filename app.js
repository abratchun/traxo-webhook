

import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import {insertRequest} from './db-module'

let upload = multer();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/webhook', upload.array(), (req, res) => {
    console.log('webhook');
    let segments = req.body.data && req.body.data.object && req.body.data.object.segments;
    segments && insertRequest(segments);
    res.sendStatus(200);

})

app.listen(5000, (req, res) => {
    console.log('server started at port 5000');
});
