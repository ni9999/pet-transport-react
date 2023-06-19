const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000 // to use .env files port number . .env should be in root (where the node modules are)

const app = express()

// listen can take two argument, port num and a function

app.listen(port, () => {console.log(`server  started now at ${port}`)})