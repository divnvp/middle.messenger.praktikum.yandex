const express = require('express');
const path = require('path');
const { fileURLToPath } = require("url");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, './dist')));

app.get('*', (req, res) => {
  res.status(200)
  res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
