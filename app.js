require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo.routes.js")
const mongoose = require('mongoose');
const DB_NAME = "TodoList"
const mongoURI = `${process.env.MONGODB_URI}/${DB_NAME}`

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.error('Error Connecting to MongoDB: ', err))
const app = express();

app.use(bodyParser.json());

app.use('/todos', todoRoutes); // mount routes at todos path

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port${port}`);
});

