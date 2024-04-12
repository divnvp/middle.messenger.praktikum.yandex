// const express = require('express');
// const path = require('path');
//
// const app = express();
// const PORT = 3000;
//
// app.use(express.static('./dist'));
//
// app.get('*', (req, res) => {
//   res.sendFile('index.html', {
//     root: path.join(__dirname, 'dist')
//   });
//   res.status(200);
// });
//
// app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.static('./index.html'));
app.listen(PORT);
