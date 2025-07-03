const express=require("express");
const { PORT } = require("./Config/config");
const http=require("http");
const {Server}=require("socket.io");
const authRoute = require("./Routes/authRoute");
const frelancerRoute = require("./Routes/freelancerRoute");
const clientRoute = require("./Routes/clientRoute");
const { socketHandler } = require("./Sockets");
const app=express();


app.use(express.json());
const server=http.createServer(app);
const io=new Server(server,{
    cors:{origin:"*"}
});

app.use("/api/auth",authRoute);
app.use("/api/freelancer",frelancerRoute)
app.use("/api/client",clientRoute)

socketHandler(io);
server.listen((PORT),()=>{
    console.log(`Server is Running on ${PORT}`);
});