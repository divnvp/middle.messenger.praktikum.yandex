const express = require('express');
const PORT = 3000;
const path = require('path');

const app = express();

app.use(express.static(path.join('index.html')));
app.get('/*', (req, res) => {
  res.sendFile(__dirname +"/dist/static/index.html");
});

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
