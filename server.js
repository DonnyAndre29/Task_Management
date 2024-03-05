// app.use(require("./routes/index"))
// app.use(require('./routes/auth'))
// app.get('/getstarted', (req, res) => {
//     res.render('signup.html')
// })

const express = require('express');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');




const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.static(path.join(__dirname, 'assets')))

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET 
}));

app.set('views', __dirname + '/assets/views')

app.set('view engine', 'html')

app.engine('html', require('ejs').renderFile)

app.get('/', (req, res) => {
    res.render('homepage.html')
})


app.use('/',userRoutes);







app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});