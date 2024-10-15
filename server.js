const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// change page urls
app.get('/Homepage', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });

app.get('Projects', function(req, res) {
    res.sendFile(__dirname + 'projects.html');
});