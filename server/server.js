const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const dotenv =require('dotenv')
const userUrls= require('./routes/userRoutes')
const adminUrls= require('./routes/adminRoutes')


const cors = require('cors')
dotenv.config({path:'./var/.env'})
mongoose.connect(process.env.DATABASE_ACCESS ,()=>console.log("database connected"))
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 },resave: true,saveUninitialized: true}))
app.use(express.json())
app.use(cors())
app.use('/',userUrls)
app.use('/admin',adminUrls)
app.use('/images', express.static('public/Posts'))
app.use('/DP', express.static('public/DP'))

app.listen(4000,()=> console.log("server is running"))