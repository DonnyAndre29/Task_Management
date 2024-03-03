const express = require('express');
const path = require('path');
require('dotenv').config()



const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.static(path.join(__dirname, 'assets')))
app.set('views', __dirname + '/assets/views')
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)
app.get('/', (req, res) => {
    res.render('homepage.html')
})



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});