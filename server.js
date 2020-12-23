const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const path = require('path');
const app = express();

//config db
connectDB();
if (process.env.NODE_ENV === 'production') {
  //app.use(express.static(path.join(__dirname, 'client/build')));
  //app.use(express.static(process.env.PWD + '/client/build'));
  app.use(express.static(__dirname + '/client/build'));
}
//middlewares
app.use(cors());
app.use(express.json({ extended: false }));

//config routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/issues', require('./routes/api/issues'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
//running server
const port = process.env.PORT || process.env.PORT_LOCAL || 5000;
app.listen(port, () => {
  console.log(`Server up and running on port: ${port}`);
});
