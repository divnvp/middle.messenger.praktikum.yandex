const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.get('/', (req, res) => {
  res.status(200)
  res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
