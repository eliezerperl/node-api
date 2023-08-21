const express = require('express');

const app = express();
const port = 5000




app.get('/api/greet', (req, res) => {
    res.send(data);
  })

app.listen(port, () => {
    console.log(`Port is listening on port ${port}`)
})