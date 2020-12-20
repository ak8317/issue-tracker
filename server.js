const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

//config db
connectDB();

//middlewares
app.use(cors());
app.use(express.json({ extended: false }));

//config routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/issues', require('./routes/api/issues'));

//running server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server up and running on port: ${port}`);
});
