const express = require('express')
const dotenv = require('dotenv')
const app = express()
const errorHandler = require('./middlewares/errorHandler')

dotenv.config()

const PORT = process.env.PORT || 3000
app.use(express.json())

const mascotasRoutes = require('./routes/mascotas.routes')
app.use('/mascotas', mascotasRoutes)

app.get('/', (req, res) => {
  res.send('API de mascotas funcionando 🐾')
})

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`)
})

const authRoutes = require('./routes/auth.routes')
app.use('/login', authRoutes)

app.use(errorHandler)
