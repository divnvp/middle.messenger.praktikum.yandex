const express = require('express');
const path = require('path');
const { fileURLToPath } = require("url");

const app = express();
const PORT = 3000;

const __dirname = path.dirname(import.meta.url);

app.use(express.static(path.join(__dirname, './dist')));

app.get('*', (req, res) => {
  res.status(200)
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
