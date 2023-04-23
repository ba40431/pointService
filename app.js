const path = require('path')
require('dotenv').config({ path: './config/env/local.env' })

const express = require('express')
const router = require('./routes')

const app = express()

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/alive', (req, res, next) => {
  return res.status(200).json('alive')
})
app.use(router)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

module.exports = app
