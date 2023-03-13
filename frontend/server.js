const express = require('express');
const app = express();
const path = require('path');

// Serve only the static files form the dist directory
app.use(express.static(dirname + '/dist/frontend'));

app.get('/*', function(req,res) {

res.sendFile(path.join(dirname+'/dist/frontend/index.html'));
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});