import express from 'express'
import bodyparser from 'body-parser'

const app = express()

app.use(bodyparser.json())

const startServer = async () => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000')
  })
}
startServer()
