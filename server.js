import express from 'express'
import path from'path'
import multer from 'multer'
// const {mergepdfs}  = require('./merge.js')
import mergepdfs from './merge.js'
const upload = multer({ dest: 'uploads/' })
const app = express()
app.use('/static', express.static('public'))
const port = 3001
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})
app.get('/xyz', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})

app.post('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
  console.log(__dirname)
})

app.post('/merge', upload.array('pdfs', 2), function (req, res, next) {
  console.log(req.files)
  mergepdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
  console.log('Current directory:', __dirname);
  res.redirect("http://localhost:3001/static/merged.pdf")
  // req.send({data: req.files})
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

