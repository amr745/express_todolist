//////////////////////////////////
//Importing Our Dependencies
/////////////////////////////////
require("dotenv").config()//get our .env variables
const express = require("express") //web framework
const mongoose = require("mongoose") //Object Document Manger (Work with DB)
const methodOverride = require("method-override") //Override request methods
const morgan = require("morgan") //be used for logging

///////////////////////
//Setup Database Connection
/////////////////////////
//loading db url
const DATABASE_URL= process.env.DATABASE_URL

//establish connection
mongoose.connect(DATABASE_URL)

//Save the connection 
const cxn = mongoose.connection

//setupmongoose connection messages
cxn
.on("open", () => console.log("The Mongo Connection is Open"))
.on("close", () => console.log("The Mongo Connection is Closed"))
.on("terror", () => console.log("The Mongo Connection is Open"))

/////////////////////
//Schemas and Models
///////////////////////

//////////////////////
//Create Express Application
///////////////////////
const app = express()

////////////////////
// Middleware - app.use(middleware function)
///////////////////
app.use(methodOverride("_method")) //override request methods for form submissions
app.use(morgan("dev")) //log every request
app.use(express.urlencoded({extended: true})) //parse html form bodies into req.body
app.use("/static", express.static("static")) //server files statically

/////////////////////////
// Routes
/////////////////////////
app.get("/", (req,res) => {
    res.send("<h1>Hello World</h1>")
})

//////////////////
// Server Listener
///////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))