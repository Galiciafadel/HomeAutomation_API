const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const hostname = 'localhost';
const port = 3000;

//Import Routes
const apartmentsRoutes=require('./routes/apartmentController');
const equipmentRoutes = require('./routes/equipmentController');
const usersRoutes = require('./routes/userController');
const apartmentTypeRoutes=require('./routes/apartmentTypeController');
const equipmentTypeRoutes=require('./routes/equipmentTypeController');
const roomTypeRoutes=require('./routes/roomTypeController');


http://localhost:3000
app.use('/apartments', apartmentsRoutes);
app.use('/users', usersRoutes);
app.use('/equipment', equipmentRoutes);
app.use('/equipmentType',equipmentTypeRoutes);
app.use('/roomType',roomTypeRoutes);
app.use('/apartmentType',apartmentTypeRoutes);



//connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
   console.log('connected to DB');
   app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
   });
});
