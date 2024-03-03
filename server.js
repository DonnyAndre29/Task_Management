const express = require('express');
// require('./middleware/auth');
// const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()




const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.static(path.join(__dirname, 'assets')))
app.set('views', __dirname + '/assets/views')
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)
// app.use(express.json);

app.get('/', (req, res) => {
    res.render('homepage.html')
})

// Route to Login Page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
  });

app.post('/login', (req, res) => {
    // Insert Login Code Here
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);
  });




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});