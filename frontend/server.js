const express = require('express');
const app = express();
const path = require('path');

// Serve only the static files form the dist directory
app.use(express.static(dirname + '/dist'));

app.get('/*', function(req,res) {

res.sendFile(path.join(dirname+'/dist/index.html'));
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});