// dependencies
require('dotenv').config();
const bcrypt = require('bcryptjs');
const express = require('express');
const path = require('node:path'); 
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const prisma = require('./prismaClient');

// settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// launch
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}!`)
});