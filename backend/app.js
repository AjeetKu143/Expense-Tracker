const express = require('express');
const cors = require('cors');
const app = express();
const { db } = require('../backend/db/db');
const {readdirSync} = require('fs');
const { route } = require('../backend/routes/transaction');


require("dotenv").config();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());

// routes
readdirSync('./routes').map((route) => {
  app.use("/api/V1", require('./routes/' + route));
})

const server = () => {
  db()
  app.listen(PORT, () => {
    console.log("You are listening to port:", PORT);
  })
};

app.get("/", (req, res) => {
  res.send("hello");
});



server();
