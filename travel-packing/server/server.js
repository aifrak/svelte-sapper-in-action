const express = require('express');
const path = require('path');

const app = express();

// This specifies that files will be served from the public directory, which is a sibling of the server directory.
app.use(express.static(path.resolve(__dirname + '/..', 'public')));

// Other port numbers can be used.
const PORT = 1234;
app.listen(PORT, () => console.log('listening on port', PORT));
