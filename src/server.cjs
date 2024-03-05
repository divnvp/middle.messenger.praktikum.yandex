const express = require('express');
const PORT = 3000;
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/')));
app.get('/*', (req, res) => {
  res.sendFile(__dirname +"/");
});

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
