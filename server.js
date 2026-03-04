const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/endpoint', (req, res) => {
  res.send('This is an endpoint!');
});

app.listen(process.env.PORT || port,);
console.log('Web server is listening at port ' + (process.env.PORT || port));