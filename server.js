const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const mongoose = require("mongoose")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static("public"))

mongoose.connect("mongodb://127.0.0.1:27017/turma8c")

const Message = mongoose.model("Message",{
 name:String,
 text:String,
 channel:String
})

io.on("connection", (socket)=>{

 socket.on("chat", async(data)=>{

  const msg = new Message(data)

  await msg.save()

  io.emit("chat",data)

 })

})

server.listen(3000,()=>{
 console.log("Servidor rodando")
})
