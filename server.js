const express = require('express');
const app = express();
const cors = require("cors")
require('dotenv').config()
const product = require('./routers/product.route')


const PORT = process.env.PORT || 5633
const { sequelize } = require('./models')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.json('Routes alive')
})

app.use('/products', product)

app.listen(PORT, async() => {
  console.log(`Listening to port ${PORT}`)
  await sequelize.authenticate();
  console.log('Connected to database')
})