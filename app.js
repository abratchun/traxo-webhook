// Require Express (HTTP server)
// http://expressjs.com

import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

let upload = multer();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/webhook', upload.array(), (req, res) => {
    console.log('test');
    console.log(req.body);
    console.log(req.body.data && req.body.data.object.segments);
    console.log(req.body.data && req.body.data.object.includes);
    res.sendStatus(200);
})



app.listen(5000, () => {
    console.log('server started');
});
