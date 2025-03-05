import express from 'express';
// Instantiate the server
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    //console.log(req);
    //console.log(res);
    res.send('Hello!');
});

// app.post('/submit-data', (req, res) => {
//     res.send('Received a POST request.');
// });

 app.get('/greeting', (req, res) => {
     res.send('Hello ' + req.query.name);
 });

 app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});